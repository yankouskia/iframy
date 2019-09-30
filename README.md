[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/yankouskia/iframy/pulls) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/yankouskia/iframy/blob/master/LICENSE) ![GitHub stars](https://img.shields.io/github/stars/yankouskia/iframy.svg?style=social)

[![NPM](https://nodei.co/npm/iframy.png?downloads=true)](https://www.npmjs.com/package/iframy)

# iframy

Library for rendering cross-domain components and communication between them

## Installation

npm:

```sh
npm install iframy --save
```

yarn:

```sh
yarn add iframy
```

## Support

| <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/internet-explorer/internet-explorer_512x512.png" alt="IE" width="48px" height="48px"/></br> Internet Explorer | <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/edge/edge_512x512.png" alt="Edge" width="48px" height="48px" /></br> Microsoft Edge | <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/firefox/firefox_512x512.png" alt="Firefox" width="48px" height="48px" /><img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/firefox-developer-edition/firefox-developer-edition_512x512.png" alt="Firefox Dev" width="48px" height="48px" /></br> Mozilla Firefox | <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/chrome/chrome_512x512.png" alt="Chrome" width="48px" height="48px" /><img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/chrome-dev/chrome-dev_512x512.png" alt="Chrome Dev" width="48px" height="48px" /><img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/archive/chrome-canary_19-48/chrome-canary_19-48_512x512.png" alt="Chrome Canary" width="48px" height="48px" /></br> Google Chrome | <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/opera/opera_512x512.png" alt="Opera" width="48px" height="48px" /><img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/opera-developer/opera-developer_512x512.png" alt="Opera Dev" width="48px" height="48px" /></br> Opera | <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/safari/safari_512x512.png" alt="Safari" width="48px" height="48px" /><img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/safari-technology-preview/safari-technology-preview_512x512.png" alt="Safari TP" width="48px" height="48px" /><img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/safari-ios/safari-ios_512x512.png" alt="Safari iOS" width="48px" height="48px" /></br> Safari | <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/android-webview-beta/android-webview-beta_512x512.png" alt="Android WebView" width="48px" height="48px" /></br> Android WebView
| --- | --- | --- | --- | --- | --- | ---
| 10+ * | 12+ | 8+ | 1+ | 9.5+ | 4+ | Yes

\* - Only for inline mode

## API

### Parent

```js
import parentFramy from 'iframe/parent';

const iframy = parentFramy.create({
  dimensions: {
    width: '100%',
    height: '100%',
  },
  id: 'example',
  props: {
    name: 'Alex',
  },
  url: './child.html',
});

iframy.render('#container');
```

### Child

```js
import childFramy from 'iframe/child';

const iframy = childFramy.init();

iframy.exposeAPI('test', data => {
  console.log(data);
  return { result: 'from function' };
});
```

## Examples

Find examples [here](https://github.com/yankouskia/iframy/tree/master/examples)

## Contributing

`iframy` is open-source library, opened for contributions

### Tests

**in progress**

### License

iframy is [MIT licensed](https://github.com/yankouskia/iframy/blob/master/LICENSE)
