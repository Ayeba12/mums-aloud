<?php
/**
 * Plugin Name: Mums Aloud Headless
 * Plugin URI:  https://mumsaloud.com/
 * Description: Makes this WordPress the content editor for the Mums Aloud website: registers Mums Stories, Articles and Mum Topics for the REST API, tells the site to refresh when content changes, and can send visitors from this CMS to the site.
 * Version:     1.0.0
 * Author:      Mums Aloud
 * Requires at least: 6.1
 * Requires PHP: 7.4
 * License:     GPL-2.0-or-later
 * Text Domain: mumsaloud-headless
 */

if (!defined('ABSPATH')) {
    exit;
}

final class Mums_Aloud_Headless
{
    const OPTION      = 'mumsaloud_headless';
    const LAST_PING   = 'mumsaloud_headless_last_ping';
    const PAGE        = 'mumsaloud-headless';
    const PING_ACTION = 'mumsaloud_headless_ping';

    /** WordPress post type => the site's collection name (web/src/lib/wordpress/collections.ts). */
    const COLLECTIONS = array(
        'post'      => 'storyLounge',
        'mum-story' => 'blog',
        'article'   => 'articles',
        'mum-topic' => 'mumTopics',
        'page'      => 'pages',
    );

    /** Collections to refresh, sent as one request at the end of this page load. '*' means everything. */
    private static $queue = array();

    public static function boot()
    {
        add_action('init', array(__CLASS__, 'register_post_types'));
        add_action('wp_after_insert_post', array(__CLASS__, 'on_post_saved'), 10, 4);
        add_action('before_delete_post', array(__CLASS__, 'on_post_deleted'), 10, 2);
        add_action('add_attachment', array(__CLASS__, 'on_media_changed'));
        add_action('attachment_updated', array(__CLASS__, 'on_media_changed'));
        add_action('delete_attachment', array(__CLASS__, 'on_media_changed'));
        add_action('shutdown', array(__CLASS__, 'flush_queue'));
        add_action('template_redirect', array(__CLASS__, 'redirect_visitors'), 1);
        add_action('admin_menu', array(__CLASS__, 'add_settings_page'));
        add_action('admin_init', array(__CLASS__, 'register_settings'));
        add_action('admin_post_' . self::PING_ACTION, array(__CLASS__, 'handle_test_ping'));
        add_filter('plugin_action_links_' . plugin_basename(__FILE__), array(__CLASS__, 'settings_link'));
    }

    public static function activate()
    {
        self::register_post_types();
        flush_rewrite_rules();
    }

    /* ---------- Content types (the same slugs, REST bases and URL shapes as the previous site) ---------- */

    public static function register_post_types()
    {
        $supports = array('title', 'editor', 'excerpt', 'thumbnail', 'author', 'revisions', 'custom-fields');
        $common   = array(
            'public'       => true,
            'show_in_rest' => true,
            'has_archive'  => true,
            'taxonomies'   => array('category', 'post_tag'),
            'supports'     => $supports,
        );

        register_post_type('mum-story', array_merge($common, array(
            'labels'        => self::labels('Mums Stories', 'Mum Story'),
            'description'   => 'All mums stories',
            'rest_base'     => 'mum-story',
            'rewrite'       => array('slug' => 'mum-story', 'with_front' => false),
            'menu_icon'     => 'dashicons-businesswoman',
            'menu_position' => 5,
        )));

        register_post_type('article', array_merge($common, array(
            'labels'        => self::labels('Articles', 'Article'),
            'description'   => 'Articles for Mums Aloud',
            'rest_base'     => 'article',
            'rewrite'       => array('slug' => 'article', 'with_front' => false),
            'hierarchical'  => true,
            'supports'      => array_merge($supports, array('page-attributes')),
            'menu_icon'     => 'dashicons-text-page',
            'menu_position' => 6,
        )));

        register_post_type('mum-topic', array_merge($common, array(
            'labels'        => self::labels('Mum Topics', 'Mum Topic'),
            'description'   => 'All mums topic',
            'rest_base'     => 'mum-topic',
            'rewrite'       => array('slug' => 'mum-topic', 'with_front' => false),
            'menu_icon'     => 'dashicons-buddicons-topics',
            'menu_position' => 7,
        )));
    }

    private static function labels($plural, $singular)
    {
        $lower = strtolower($plural);
        return array(
            'name'               => $plural,
            'singular_name'      => $singular,
            'menu_name'          => $plural,
            'all_items'          => 'All ' . $plural,
            'add_new'            => 'Add New',
            'add_new_item'       => 'Add New ' . $singular,
            'edit_item'          => 'Edit ' . $singular,
            'new_item'           => 'New ' . $singular,
            'view_item'          => 'View ' . $singular,
            'view_items'         => 'View ' . $plural,
            'search_items'       => 'Search ' . $plural,
            'not_found'          => 'No ' . $lower . ' found',
            'not_found_in_trash' => 'No ' . $lower . ' found in the bin',
        );
    }

    /* ---------- Telling the site to refresh ---------- */

    public static function on_post_saved($post_id, $post, $update, $post_before)
    {
        if (!$post || !isset(self::COLLECTIONS[$post->post_type])) {
            return;
        }
        if (wp_is_post_revision($post_id) || wp_is_post_autosave($post_id)) {
            return;
        }
        $was_public = $post_before && $post_before->post_status === 'publish';
        $is_public  = $post->post_status === 'publish';
        if ($was_public || $is_public) {
            self::queue(self::COLLECTIONS[$post->post_type]);
        }
    }

    public static function on_post_deleted($post_id, $post = null)
    {
        $post = $post ? $post : get_post($post_id);
        if ($post && isset(self::COLLECTIONS[$post->post_type])) {
            self::queue(self::COLLECTIONS[$post->post_type]);
        }
    }

    /** An image's alt text or file can change how any page looks, so the whole site refreshes. */
    public static function on_media_changed()
    {
        self::queue('*');
    }

    private static function queue($collection)
    {
        // The importer and autosaves would send a ping per item; press "Refresh the site now" after an import instead.
        if ((defined('WP_IMPORTING') && WP_IMPORTING) || (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE)) {
            return;
        }
        self::$queue[$collection] = true;
    }

    public static function flush_queue()
    {
        if (!self::$queue) {
            return;
        }
        $collections = array_keys(self::$queue);
        self::$queue = array();
        $one = (count($collections) === 1 && $collections[0] !== '*') ? $collections[0] : null;
        self::ping($one);
    }

    /**
     * Ask the site to refresh one collection, or everything when $collection is null.
     * The site answers 200 with the tags it refreshed; the result is kept for the settings page.
     */
    public static function ping($collection = null)
    {
        $site   = self::site_url();
        $secret = self::secret();
        $result = array(
            'time'       => current_time('mysql'),
            'collection' => $collection ? $collection : 'everything',
            'ok'         => false,
            'message'    => '',
        );

        if (!$site || !$secret) {
            $result['message'] = 'The site URL or the secret is not set yet.';
            update_option(self::LAST_PING, $result, false);
            return $result;
        }

        $response = wp_remote_post($site . '/api/revalidate/', array(
            'timeout' => 8,
            'headers' => array(
                'Content-Type'        => 'application/json',
                'x-revalidate-secret' => $secret,
            ),
            'body'    => wp_json_encode($collection ? array('collection' => $collection) : new stdClass()),
        ));

        if (is_wp_error($response)) {
            $result['message'] = 'Could not reach the site: ' . $response->get_error_message();
        } else {
            $code = (int) wp_remote_retrieve_response_code($response);
            $body = trim((string) wp_remote_retrieve_body($response));
            $result['ok']      = $code === 200;
            $result['message'] = 'HTTP ' . $code . ($body !== '' ? ' ' . substr($body, 0, 200) : '');
        }
        update_option(self::LAST_PING, $result, false);
        return $result;
    }

    /* ---------- Settings ---------- */

    private static function settings()
    {
        $saved = get_option(self::OPTION, array());
        return array_merge(
            array('site_url' => '', 'secret' => '', 'redirect' => 0),
            is_array($saved) ? $saved : array()
        );
    }

    /** The site's address: a constant in wp-config.php wins over the saved setting. */
    private static function site_url()
    {
        if (defined('MUMSALOUD_SITE_URL') && MUMSALOUD_SITE_URL) {
            return untrailingslashit(MUMSALOUD_SITE_URL);
        }
        $settings = self::settings();
        return $settings['site_url'];
    }

    /** The shared secret (REVALIDATE_SECRET on the site): a constant in wp-config.php wins over the saved setting. */
    private static function secret()
    {
        if (defined('MUMSALOUD_REVALIDATE_SECRET') && MUMSALOUD_REVALIDATE_SECRET) {
            return MUMSALOUD_REVALIDATE_SECRET;
        }
        $settings = self::settings();
        return $settings['secret'];
    }

    public static function register_settings()
    {
        register_setting('mumsaloud_headless', self::OPTION, array(
            'type'              => 'array',
            'sanitize_callback' => array(__CLASS__, 'sanitize_settings'),
            'default'           => array(),
        ));
    }

    public static function sanitize_settings($input)
    {
        $current = self::settings();
        $input   = is_array($input) ? $input : array();
        $secret  = isset($input['secret']) ? trim((string) $input['secret']) : '';
        return array(
            'site_url' => isset($input['site_url']) ? untrailingslashit(esc_url_raw(trim((string) $input['site_url']))) : $current['site_url'],
            // An empty field keeps the saved secret, so saving the page never wipes it.
            'secret'   => $secret !== '' ? $secret : $current['secret'],
            'redirect' => empty($input['redirect']) ? 0 : 1,
        );
    }

    public static function add_settings_page()
    {
        add_options_page('Headless site', 'Headless site', 'manage_options', self::PAGE, array(__CLASS__, 'render_settings_page'));
    }

    public static function settings_link($links)
    {
        array_unshift($links, '<a href="' . esc_url(admin_url('options-general.php?page=' . self::PAGE)) . '">Settings</a>');
        return $links;
    }

    public static function render_settings_page()
    {
        if (!current_user_can('manage_options')) {
            return;
        }
        $settings     = self::settings();
        $last         = get_option(self::LAST_PING);
        $site_fixed   = defined('MUMSALOUD_SITE_URL') && MUMSALOUD_SITE_URL;
        $secret_fixed = defined('MUMSALOUD_REVALIDATE_SECRET') && MUMSALOUD_REVALIDATE_SECRET;
        $option       = esc_attr(self::OPTION);
        $site_help    = $site_fixed ? 'Set by MUMSALOUD_SITE_URL in wp-config.php.' : "The website's address, without a path. Use the Vercel preview address until the domain moves.";
        $secret_help  = $secret_fixed ? 'Set by MUMSALOUD_REVALIDATE_SECRET in wp-config.php.' : "The same value as REVALIDATE_SECRET in the site's hosting settings. Leave empty to keep the saved one.";
        $secret_hint  = ($settings['secret'] || $secret_fixed) ? 'Saved. Enter a new one to replace it.' : 'Paste the REVALIDATE_SECRET from the site';
        ?>
        <div class="wrap">
            <h1>Headless site</h1>
            <p>This WordPress is the content editor for the Mums Aloud website. When you publish, update, bin or delete a story, article, page or image, the site is told to refresh within seconds.</p>
            <?php if (isset($_GET['pinged']) && $last) : ?>
                <div class="notice <?php echo $last['ok'] ? 'notice-success' : 'notice-error'; ?> is-dismissible"><p>
                    <?php echo $last['ok'] ? 'The site refreshed.' : 'The refresh failed.'; ?>
                    <?php echo esc_html($last['message']); ?>
                </p></div>
            <?php endif; ?>
            <form method="post" action="options.php">
                <?php settings_fields('mumsaloud_headless'); ?>
                <table class="form-table" role="presentation">
                    <tr>
                        <th scope="row"><label for="mah-site">Site URL</label></th>
                        <td>
                            <input id="mah-site" class="regular-text code" type="url" name="<?php echo $option; ?>[site_url]" value="<?php echo esc_attr(self::site_url()); ?>" placeholder="https://mumsaloud.com" <?php disabled($site_fixed); ?>>
                            <p class="description"><?php echo esc_html($site_help); ?></p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="mah-secret">Secret</label></th>
                        <td>
                            <input id="mah-secret" class="regular-text code" type="password" autocomplete="new-password" name="<?php echo $option; ?>[secret]" value="" placeholder="<?php echo esc_attr($secret_hint); ?>" <?php disabled($secret_fixed); ?>>
                            <p class="description"><?php echo esc_html($secret_help); ?></p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Visitors</th>
                        <td>
                            <label><input type="checkbox" name="<?php echo $option; ?>[redirect]" value="1" <?php checked(!empty($settings['redirect'])); ?>> Send visitors from this CMS to the site</label>
                            <p class="description">Tick once the site is live. Anyone who opens a page here is sent to the same address on the site. Editors who are signed in are not affected, and the REST API keeps working.</p>
                        </td>
                    </tr>
                </table>
                <?php submit_button(); ?>
            </form>

            <h2>Test the connection</h2>
            <p>Sends a refresh request for everything, exactly as a publish does. Use it after an import too, since imports do not send one per item.</p>
            <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
                <input type="hidden" name="action" value="<?php echo esc_attr(self::PING_ACTION); ?>">
                <?php wp_nonce_field(self::PING_ACTION); ?>
                <?php submit_button('Refresh the site now', 'secondary', 'submit', false); ?>
            </form>
            <?php if ($last) : ?>
                <p><strong>Last refresh request:</strong> <?php echo esc_html($last['time']); ?>, <?php echo esc_html($last['collection']); ?>: <?php echo esc_html($last['message']); ?></p>
            <?php endif; ?>
        </div>
        <?php
    }

    public static function handle_test_ping()
    {
        if (!current_user_can('manage_options')) {
            wp_die('You are not allowed to do that.');
        }
        check_admin_referer(self::PING_ACTION);
        self::ping(null);
        wp_safe_redirect(add_query_arg(array('page' => self::PAGE, 'pinged' => '1'), admin_url('options-general.php')));
        exit;
    }

    /* ---------- Visitors ---------- */

    /** With the option on, a visitor who opens this CMS is sent to the same path on the site. */
    public static function redirect_visitors()
    {
        $settings = self::settings();
        $site     = self::site_url();
        if (empty($settings['redirect']) || !$site) {
            return;
        }
        if (is_admin() || is_user_logged_in() || is_preview() || is_robots() || is_feed()) {
            return;
        }
        if (defined('REST_REQUEST') && REST_REQUEST) {
            return;
        }
        $request = isset($_SERVER['REQUEST_URI']) ? wp_unslash($_SERVER['REQUEST_URI']) : '/';
        $path    = wp_parse_url($request, PHP_URL_PATH);
        wp_redirect($site . ($path ? $path : '/'), 302);
        exit;
    }
}

Mums_Aloud_Headless::boot();
register_activation_hook(__FILE__, array('Mums_Aloud_Headless', 'activate'));
register_deactivation_hook(__FILE__, 'flush_rewrite_rules');
