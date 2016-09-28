const crypto = window.nodeRequire('crypto');

function createHash(string) {
  const hash = crypto.createHash('sha512');
  return hash.update(string).digest('hex');
}
