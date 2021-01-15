# Browser extension to generate TOTP

## Install

* [Firefox](https://addons.mozilla.org/en-US/firefox/addon/totp-in-a-click-public/)
* [Chrome](https://chrome.google.com/webstore/detail/totp-in-a-click/cdhkohjbbelomjjklfejennombggbbkk)

## Screenshot

![screenshot](media/preview.png)

## Features

Generate by default 6 digits, 30 seconds TOTP when selecting a Base32 secret and copy it to your clipboard.

You can precise options using the parameter `period`, `algorithm`, `digits` for exemple :

```
<base32 key>&period=15&algorithm=SHA-256&digits=8
```

### Permissions

The extension requires the following permission from you for working.

1. `contextMenus`: to show option when right-clicking.
2. `activeTab`: to be able to access content on page.
3. `clipboardWrite`: to be able to write data to clipboard (we still can’t read from your clipboard).

## Related

- [browser-extension-template](https://github.com/notlmn/browser-extension-template) - Barebones boilerplate with webpack, options handler and auto-publishing.

## License

[MIT](license)
