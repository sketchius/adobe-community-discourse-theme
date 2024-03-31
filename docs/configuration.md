# Component Settings

In order for this Theme to work as intended, some of the Theme Components used will require specific settings.

## Search Banner

The Search Banner Theme component allows you to customize the banner displayed on the homepage. In order for it to appear correctly, the following settings should be selected:

1. Navigate to: **Admin -> Settings -> Customize -> Themes -> Components -> discourse-search-banner**
2. Configure using these settings:

> **Show on:** Homepage\
> **Plugin outlet:** below-site-header\
> **Background image light, background image dark:** (Upload desired background image here)\
> **search_banner.headline:** “Connect and get inspired.”

_Note that you can customize the background image and message at any time in the future._

## Stat Banner

This component is used to display site stats within the Search Banner:

1. Navigate to: **Admin -> Settings -> Customize -> Themes -> Components -> Stat banner**
2. Configure using these settings:

> **display stats:**

| source       | period   | title             |
| ------------ | -------- | ----------------- |
| users        | 30_days  | users this month  |
| topics       | 30_days  | topics this month |
| active_users | last_day | active users      |

> **Plugin outlet:** ' ' _(a single space. this prevents the component from rendering itself--the theme will render it within the Search Banner component.)_

_Note that you can customize the background image and message at any time in the future._

# Site Settings

This theme changes many aspects of the appearance and functionality of a site, but for an optimal experience, there are some settings that must be selected in the site's Admin Settings.

## Category List as Homepage

The original site features a list of Communities as a homepage. To match this experience, the site will need to be set to display the Categories list by default:

1. Navigate to: **Admin -> Settings -> Basic Setup -> top menu**
2. Use the arrow buttons to move 'categories' to the top of the list.

## Category Setup

### Category Display Type

To display Categories properly, the Theme requires a certain category page style to be selected:

1. Navigate to: **Admin -> Settings -> Basic Setup -> desktop category page style**
2. Choose 'Boxes with Subcategories'

### Allowing SVG Images for Categories

The original icons for Communities (i.e. Photoshop, Illustrator) are .svg files. Before these files can be used for Categories, a setting must be changed:

1. Navigate to: **Admin -> Settings -> Files -> authorized extensions**
2. Click the (+), type 'svg', and confirm.

### Adding Categories

To ensure Categories appear as intended with this theme, follow these steps:

1. Navigate to Category list.
2. Click 'New Category'
3. Add a title and any other details
4. Click the 'Images' tab.
5. Upload an icon for the Category in 'Category Logo Image'.

## Sidebar Display

Discourse features a Sidebar component with navigation shortcuts to various areas. This can be hidden in a navigation menu using this setting:

1. Navigate to: Admin -> Settings -> Navigation -> navigation menu
2. Navigate to: Select 'Header Dropdown'
