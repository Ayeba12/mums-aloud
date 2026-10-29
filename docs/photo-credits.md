# Photo and logo credits

Placeholder photography until Mums Aloud supplies consented community photos. All images are free to use under the [Unsplash License](https://unsplash.com/license) (checked 20 October 2026). Credit is not required but is good practice.

These are stock photos. The people shown are not Mums Aloud members, and must not be presented as members, quoted, or named. Do not infer nationality or location from appearance.

| File (`src/assets/photos/`) | Photographer | Source | Used for |
| --- | --- | --- | --- |
| `two-women-laughing.jpg` | Andra C Taylor Jr | https://unsplash.com/photos/KfoNVMCFb5M | Homepage hero slideshow; Mama's Escape community card and join photo; the contact and partnership confirmation emails (`public/email/contact.jpg`, a 1200x675 crop) |
| `mother-kissing-baby.jpg` | Lawrence Crayton | https://unsplash.com/photos/KCZ5msJzxPQ | Homepage feature tabs; Mama's Escape experience portrait |
| `women-community-circle.jpg` | Iwaria Inc. | https://unsplash.com/photos/GLLeZ59t3bA | Homepage story panel; Mama's Escape portrait row; the volunteer confirmation email (`public/email/volunteer.jpg`, a 1200x675 crop) |
| `mother-daughter-embrace.jpg` | Ben Masora | https://unsplash.com/photos/8hLjTQCNbNY | Homepage photo row; Mama's Escape berry panel |
| `two-friends-smiling.jpg` | Andra C Taylor Jr | https://unsplash.com/photos/CmdrVG8gmhg | Homepage photo row; Mama's Escape portrait row |
| `hero-mother-baby-golden-hour.jpg` | Junior REIS | https://unsplash.com/photos/9ooYPL2Tffg | Homepage photo row; Mama's Escape newsletter card; About mission panel (vision card) |
| `mother-baby-smiling.jpg` | Andrae Ricketts | https://unsplash.com/photos/3Qi0PkM_Wes | Homepage newsletter invitation; Mama's Escape podcast card and portrait row |
| `mother-daughter-park.jpg` | Dion Martins | https://unsplash.com/photos/Tt4H8glyHKs | Site footer tile; Mama's Escape hero |

Eight photos cover eleven placements on the Mama's Escape page and footer, so three repeat: `two-women-laughing.jpg` (community card and join photo), `mother-baby-smiling.jpg` (podcast card and portrait row) and `mother-daughter-park.jpg` (hero and footer). Three more photos, ideally the client's own, would remove the repeats.

The client brief asks for real, non-stock photos in the hero. Replace these with consented community photography when available.

## Email assets

`public/email/` holds the files the transactional emails load from the site, since inboxes need absolute addresses and plain formats: `logo.png` is the wordmark from `public/brand/mumsaloud-logo.webp` as a 240px PNG (WebP does not show in every inbox), `volunteer.jpg` is the crop of `women-community-circle.jpg` noted above, and `contact.jpg` the crop of `two-women-laughing.jpg`.

## Team portraits (the client's own photos)

Supplied by the owner on 26 October 2026 and stored in `src/assets/photos/team/`. They arrived without names. The owner confirmed every match on 26 October 2026: red wrap top on brown = Bokun Imoukhuede; grey background with braids = Oyindamola; black and white with pearls = Dk Jonah; teal jacket on white = Yemi Komolafe. ## Council portraits (the client's own photos)

Supplied by the owner on 26 October 2026 and stored in `src/assets/photos/council/`, resized to 1600px on the long side. They arrived without names; each was matched to the named thumbnail on the previous site's Mum's Council page (read 26 October 2026): brown scarf selfie with the mirror = Bella Abidakun; white blouse, arms crossed, blue background = Temi Fagbo; black dress with gold earrings = Bukunmi Ladeji; green faux fur coat = Elizabeth Toluwani; curly hair and pink lipstick on light blue = Abies Sonia. The owner confirmed every match on 26 October 2026.

Together with the team portraits these are the only photos on the site that stand for named people.

## Partner logos

Gathered on 26 October 2026 from each organisation's own site unless noted, cleaned (scripts, event handlers and external references stripped from SVGs; transparent margins trimmed from PNGs, capped at 320px tall) and stored in `public/partners/`. They are shown on the homepage partner tiles with the organisation's name as alt text. Showing a partner's logo is the partner's call: confirm permission with each before launch.

| File | Organisation | Source | Notes |
| --- | --- | --- | --- |
| `national-lottery.svg` | The National Lottery Community Fund | https://www.tnlcommunityfund.org.uk/media/sovnf1mw/the-national-lottery-community-fund-logo-in-english.svg | The crossed-fingers mark is a Gambling Commission trade mark. The Fund's terms allow it only for a funded project, not beyond the grant's life; minimum 20px on screen; branding@tnlcommunityfund.org.uk. Confirm Mums Aloud holds or held a grant. |
| `nhs.svg` | NHS | https://commons.wikimedia.org/wiki/File:National_Health_Service_(England)_logo.svg | Registered trade mark. NHS Identity rules: it cannot be used as part of another organisation's identity, or to imply endorsement, without authorisation. The previous site showed three NHS bodies instead (North Thames Genomic Medicine Service, Lewisham and Greenwich NHS Trust, South East Genomic Medicine Service); the owner chose the generic NHS mark over naming one of them (27 October 2026); ask the NHS partner for authorisation before launch. `nhs-white.svg` is the reversed version for dark grounds (white lozenge, letters cut out), built from the same file. |
| `cahn.png` | Caribbean & African Health Network (CAHN) | https://www.cahn.org.uk/wp-content/uploads/2021/04/CAHN-Logo_Black_New.png | The site links to a rebrand page; check the mark before launch. |
| `rehoboth-for-families.png` | Rehoboth for Families, Children and Young People (charity 1190359) | https://rehobothforfamilies.org.uk/wp-content/uploads/2021/01/cropped-rehobothlogo.jpg | The site publishes only a JPG crop; the white background was lifted to transparency here. Ask the charity for the master. |
| `trafford-council.png` | Trafford Council | https://www.trafford.gov.uk/themes/custom/bbd_localgov/logo.svg (the PNG embedded in it) | The council's header asset is white artwork; recoloured to the site's ink for the light card. Raster, so keep it small; ask the comms team for a vector. |
| `manchester-city-council.svg` | Manchester City Council | The header logo embedded in https://www.manchester.gov.uk/__data/assets/git_bridge/0018/6066/main.css | Published only in white; the fills were changed to the site's ink. |
| `trafford-community-collective.svg` | Trafford Community Collective (charity 1193780) | https://traffordcollective.org.uk/wp-content/uploads/2023/12/602fe03362aa348ef68efb22_TCC-Main.svg | |
| `read-with-doja.png` | Read with Doja | https://readwithdoja.com/wp-content/uploads/2025/02/Asset-1.png | Low resolution (451px); ask for the master. The owner confirmed this is the right Read with Doja (27 October 2026). |
| `she-reconnects.png` | She Reconnects | https://she-reconnects.net/wp-content/uploads/2023/10/full-logo-white.png (wordmark) and logo-green.png (brand green) | The full lockup is published only in white; recoloured to the brand green sampled from the icon. Founded by Bokun Imoukhuede and Dinma Nwobi. |
| `blossom-foundation.png` | Blossom Foundation (charity 1177641, Manchester) | https://static.wixstatic.com/media/f759a1_cda4b63c66f647d69aee9ffd21340063~mv2.png (the site's main logo) | The Manchester charity for Black African girls; the owner confirmed it is the partner meant (27 October 2026). |
| none | Chuck Gallery | https://www.chuckgallery.com/ | The gallery has no logo file anywhere public (its site sets the name in type), so the tile shows the name. Ask the gallery for one. |
