import { getBabelOutputPlugin } from '@rollup/plugin-babel'

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
  createOutput('./client.js', './dist/client.js'),
  createOutput('./initClient.js', './dist/initClient.js')
]
