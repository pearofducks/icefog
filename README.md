# env-cfg

a utility for passing environment/config info from server to client

## install

```shell
yarn add env-cfg
```

## use

On the server, create a config string:

```js
import { createConfig } from 'env-cfg'

const configString = createConfig({ isDev: true, token: 'abc' })
// then add this string to your rendered markup
// e.g. - `<div id="app" ${configString}></div>`
```

Then on the client, read the config string:

```js
import { initConfig } from 'env-cfg'
initConfig()
```

the `config` export is then available for use anywhere in your app:

```js
import { config } from 'env-cfg'

if (config.isDev) // do development-specific things
```

## api

### createConfig

`createConfig(config: object): string`

### initConifg

`initConfig(elementId: string = 'app', { windowAttr: string = 'app' })`

- `elementId` is the DOM element you render the configString onto
- `windowAttr` is only used if `config.isDev` is true, and will attach the config to this `window` attribute

### config

Effectively the object you provided to `createConfig`, with any functions stripped
