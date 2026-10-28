<?php
// Removes the plugin's saved settings when it is deleted from the Plugins screen.
if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}
delete_option('mumsaloud_headless');
delete_option('mumsaloud_headless_last_ping');
