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

## DEMO

<a href="https://yankouskia.github.io/iframy/demo/communication.html" target="_blank">Communication demo</a>

## Support

| <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/internet-explorer/internet-explorer_512x512.png" alt="IE" width="48px" height="48px"/></br> Internet Explorer | <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/edge/edge_512x512.png" alt="Edge" width="48px" height="48px" /></br> Microsoft Edge | <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/firefox/firefox_512x512.png" alt="Firefox" width="48px" height="48px" /><img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/firefox-developer-edition/firefox-developer-edition_512x512.png" alt="Firefox Dev" width="48px" height="48px" /></br> Mozilla Firefox | <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/chrome/chrome_512x512.png" alt="Chrome" width="48px" height="48px" /><img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/chrome-dev/chrome-dev_512x512.png" alt="Chrome Dev" width="48px" height="48px" /><img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/archive/chrome-canary_19-48/chrome-canary_19-48_512x512.png" alt="Chrome Canary" width="48px" height="48px" /></br> Google Chrome | <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/opera/opera_512x512.png" alt="Opera" width="48px" height="48px" /><img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/opera-developer/opera-developer_512x512.png" alt="Opera Dev" width="48px" height="48px" /></br> Opera | <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/safari/safari_512x512.png" alt="Safari" width="48px" height="48px" /><img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/safari-technology-preview/safari-technology-preview_512x512.png" alt="Safari TP" width="48px" height="48px" /><img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/safari-ios/safari-ios_512x512.png" alt="Safari iOS" width="48px" height="48px" /></br> Safari | <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/android-webview-beta/android-webview-beta_512x512.png" alt="Android WebView" width="48px" height="48px" /></br> Android WebView
| --- | --- | --- | --- | --- | --- | ---
| 10+ * | 12+ | 8+ | 1+ | 9.5+ | 4+ | Yes

\* - Only for inline mode

## API

### Parent

#### create

Use method to initiate instance and pass necessary props / iframe configuration

`dimensions` - object with `width` and `height` properties, applied to iframe

`props` - any serializable initial data to send to child

`scrolling` - param to highlight whether content inside iframe should be scrollable

`url` - url to open inside child iframe

```js
import { IFramyParent } from 'iframy/parent';

const iframy = IFramyParent.create({
  dimensions: {
    width: '80%',
    height: '80%',
  },
  props: {
    name: 'Alex',
  },
  scrolling: true,
  url: 'https://web-site.com',
});
```

#### render

Async method to render iframe into specific container. Used for lazy rendering of component. Once promise is resolved - child component is ready to be used

`selector` - string / HTMLElement parameter to point container where to render iframe

```js
import { IFramyParent } from 'iframy/parent';

const iframy = IFramyParent.create({
  dimensions: {
    width: '80%',
    height: '80%',
  },
  props: {
    name: 'Alex',
  },
  scrolling: true,
  url: 'https://web-site.com',
});

await iframy.render('#container');
```

#### emit

Method to send message to child component

```js
iframy.emit('message-type', { any: 'data' });
```

#### addListener / on

Method to subscribe to events, being sent from child

```js
iframy.addListener('message-type', data => console.log(data));

// or use alias

iframy.on('message-type', data => console.log(data));
```

#### addListenerOnce / once

Method to subscribe to events, being sent from child; emitted once and listener is removed after that

```js
iframy.addListenerOnce('message-type', data => console.log(data));

// or use alias

iframy.once('message-type', data => console.log(data));
```

#### removeListener / off

Method to remove specific listener from correspondent event type from child

```js
iframy.removeListener('message-type', listener);

// or use alias

iframy.off('message-type', listener);
```

#### removeAllListeners / offAll

Method to remove all listeners from correspondent event type from child

```js
iframy.removeAllListeners('message-type');

// or use alias

iframy.offAll('message-type');
```


### Child

#### create

Use method to initialize child component and let parent know, that your iframe is ready

`api` - object of `{ [key: string]: function }` structure to initialize api, being used by parent

```js
import { IFramyChild } from 'iframy/child';

const iframy = await IFramyChild.create({
  api: {
    sendMessage: data => {;
      return `Message: ${data}`;
    },
  },
});
```

#### emit

Method to send message to parent component

```js
iframy.emit('message-type', { any: 'data' });
```

#### addListener / on

Method to subscribe to events, being sent from parent

```js
iframy.addListener('message-type', data => console.log(data));

// or use alias

iframy.on('message-type', data => console.log(data));
```

#### addListenerOnce / once

Method to subscribe to events, being sent from parent; emitted once and listener is removed after that

```js
iframy.addListenerOnce('message-type', data => console.log(data));

// or use alias

iframy.once('message-type', data => console.log(data));
```

#### removeListener / off

Method to remove specific listener from correspondent event type from parent

```js
iframy.removeListener('message-type', listener);

// or use alias

iframy.off('message-type', listener);
```

#### removeAllListeners / offAll

Method to remove all listeners from correspondent event type from parent

```js
iframy.removeAllListeners('message-type');

// or use alias

iframy.offAll('message-type');
```

## Examples

Find example [here](https://github.com/yankouskia/iframy/tree/master/demo)

## Contributing

`iframy` is open-source library, opened for contributions

### Tests

**in progress**

### License

iframy is [MIT licensed](https://github.com/yankouskia/iframy/blob/master/LICENSE)
