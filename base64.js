/** @type {import('./base64.d.ts').decode} */
export const decode = (encoded) => new TextDecoder().decode(Uint8Array.from(atob(encoded), (m) => m.codePointAt(0)))

/** @type {import('./base64.d.ts').encode} */
export const encode = (source) => Buffer.from(source, 'utf8').toString('base64')
