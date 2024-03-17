export function decode_utf8(s: string) {
  return decodeURIComponent(s);
}

export function encode_utf8(s: string) {
  return encodeURIComponent(s);
}
