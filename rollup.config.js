import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import pkg from './package.json'

const createOutput = (input, outputFile) => ({
  input,
  output: {
    file: outputFile,
    format: 'esm',
    sourcemap: true,
    plugins: [
      getBabelOutputPlugin({
        presets: [['@babel/preset-env', { targets: ['supports es6-module and last 2 versions and not dead'], bugfixes: true }]],
        sourceMaps: true
      })
    ]
  },
  external: ['./client.js']
})

export default [
  createOutput('./client.js', pkg.exports['.']),
  createOutput('./initClient.js', pkg.exports['./init'])
]
