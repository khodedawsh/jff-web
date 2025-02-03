function genReqCipher() {
  return CryptoJS.algo.AES.createEncryptor(CryptoJS.enc.Utf8.parse(REQUEST_KEY), {
    iv: CryptoJS.enc.Utf8.parse(HH_IV),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
}

function genResCipher() {
  return CryptoJS.algo.AES.createDecryptor(CryptoJS.enc.Utf8.parse(RESPONSE_KEY), {
    iv: CryptoJS.enc.Utf8.parse(HH_IV),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
}

function decryptRequest(payload) {
  const decrypted = genReqCipher().finalize(CryptoJS.enc.Base64.parse(payload));
  return CryptoJS.enc.Utf8.stringify(decrypted);
}

function encryptRequest(payload) {
  const encrypted = genReqCipher().finalize(CryptoJS.enc.Utf8.parse(payload));
  return CryptoJS.enc.Base64.stringify(encrypted);
}

function decryptResponse(payload) {
  const decrypted = genResCipher().finalize(CryptoJS.enc.Base64.parse(payload));
  return CryptoJS.enc.Utf8.stringify(decrypted);
}

function encryptResponse(payload) {
  const encrypted = genReqCipher().finalize(CryptoJS.enc.Utf8.parse(payload));
  return CryptoJS.enc.Base64.stringify(encrypted);
} 