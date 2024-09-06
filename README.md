## 👋 What's this nifty plugin all about?
This plugin is your new best friend for managing variable scopes in Figma. It's designed to help you quickly filter, search, and modify the scopes of your local variables without breaking a sweat.

## What can you do with it?
1. Filter variables by type: Whether you're looking for NUMBER, COLOR, STRING this plugin's got you covered.
2. Search like a pro: Need to find a specific variable? Just start typing, and the plugin will show you matching results in real-time.
3. Bulk scope changes: Want to change the scopes for multiple variables at once? No problem! Select the variables you want to modify, choose the new scopes, and voila!
4. Quick overview: Get a bird's-eye view of all your variables, their types, and current scopes in one convenient list.

## How to use it?
1. Fire up the plugin
2. Choose the variable type you want to work with
3. Use the search box to filter the variables you want to edit
4. Apply new scopes. 

It's that simple! This plugin is perfect for keeping your variables organized and your workflow smooth. So go ahead, give it a spin, and take control of your Figma variables like never before! 🚀

☕️ Buy me a coffee (https://buymeacoffee.com/lazerbach)

### Don't miss out on these other pro tools

*[Variables everywhere](https://www.figma.com/community/plugin/1404403514737707928/variables-everywhere)*
Quickly scan your selection for variables you actually forgot to apply (It's free)

*[Brutal](https://www.figma.com/community/plugin/1215386279132052346/brutal)*
A super light-weight plugin to remove, detach styles, variables etc (It's free)





## Development guide

*This plugin is built with [Create Figma Plugin](https://yuanqing.github.io/create-figma-plugin/).*

### Pre-requisites

- [Node.js](https://nodejs.org) – v20
- [Figma desktop app](https://figma.com/downloads/)

### Build the plugin

To build the plugin:

```
$ npm run build
```

This will generate a [`manifest.json`](https://figma.com/plugin-docs/manifest/) file and a `build/` directory containing the JavaScript bundle(s) for the plugin.

To watch for code changes and rebuild the plugin automatically:

```
$ npm run watch
```

### Install the plugin

1. In the Figma desktop app, open a Figma document.
2. Search for and run `Import plugin from manifest…` via the Quick Actions search bar.
3. Select the `manifest.json` file that was generated by the `build` script.

### Debugging

Use `console.log` statements to inspect values in your code.

To open the developer console, search for and run `Show/Hide Console` via the Quick Actions search bar.

## See also

- [Create Figma Plugin docs](https://yuanqing.github.io/create-figma-plugin/)
- [`yuanqing/figma-plugins`](https://github.com/yuanqing/figma-plugins#readme)

Official docs and code samples from Figma:

- [Plugin API docs](https://figma.com/plugin-docs/)
- [`figma/plugin-samples`](https://github.com/figma/plugin-samples#readme)
