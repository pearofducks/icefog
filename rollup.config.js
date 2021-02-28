import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import pkg from './package.json'

const createOutput = (input, outputFile) => ({
  input,
  output: {
    file: outputFile,
    format: 'esm',
    plugins: [
      getBabelOutputPlugin({ presets: [['@babel/preset-env', { targets: ['supports es6-module and last 2 versions and not dead'] }]] })
    ]
  }
})

export default [
  createOutput('./client.js', pkg.exports['.']),
  createOutput('./initClient.js', pkg.exports['./init'])
]
