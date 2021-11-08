export function decode(encoded) {
  const data = Array.prototype.map.call(atob(encoded), c => c.charCodeAt(0))
  return decodeURIComponent(data.map(c => '%' + ('00' + c.toString(16)).slice(-2)).join(''));
}

export function encode(source) {
  return Buffer.from(source, 'utf8').toString('base64');
}
