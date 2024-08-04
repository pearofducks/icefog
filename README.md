# icefog

a utility for passing environment/config info from server to client

## install

```shell
pnpm -D add icefog
```

## use

On the server, create a config string:

```js
import { createConfig } from 'icefog/server'

const configString = createConfig({ isDev: true, token: 'abc' })
// then add this string to your rendered markup
// e.g. - `<div id="app" ${configString}></div>`
```

Then on the client, read the config string:

```js
import 'icefog/init' // for the default element of '#app'
```

or

```js
import { initConfig } from 'icefog'
initConfig('my-dom-element')
```

the `config` export is then available for use anywhere in your app:

```js
import { config } from 'icefog'

if (config.isDev) // do development-specific things
```

## api

### createConfig

`createConfig(config: object): string`

Creates a base64-encoded, stringified version of the object provided.

### initConifg

`initConfig(element: (Element | string) = '#app', { windowAttr: string = 'configs', configId: string = '_id' })`

- `element` is the DOM element you render the configString onto and can be either an Element or a _querySelector_

### config

Effectively the object you provided to `createConfig`, with any functions stripped

### getConfig

`getConfig(element: (Element | string) = '#app')`

Returns the config found on the element and removes it.

### useConfig

`useConfig()`

Returns the `config` export, useful in a Typescript environment
