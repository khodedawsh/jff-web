const signature = new Uint8Array([0x30, 0x82, 0x03, 0x7a, /* ... rest of signature bytes ... */]);
const signature_md5 = "d63b2eabf70b5fefc6ac38be9923bd1b";
const app_name = "com.MahsaNet.MahsaNG";

function fG(seed) {
    let inputBytes;
    if (typeof seed === 'string') {
        inputBytes = new TextEncoder().encode(seed);
    } else {
        inputBytes = seed;
    }
    let res = CryptoJS.MD5(CryptoJS.lib.WordArray.create(inputBytes)).toString();
    while (res.length < 32) {
        res = "0" + res;
    }
    return res;
}

function fE() {
    return signature_md5 || fG(signature);
}

function fB(string) {
    return fG(fG(app_name) + fE().slice(4, 12) + string);
}

function fD(str0, str2, str3, str4, str5) {
    return fG(fG(str0).slice(2, 27) + str2 + str4 + fG(str3).slice(3, 25) + str2 + str5).slice(0, 20);
}

function iO(ip, timestamp) {
    return fG(
        ip +
        fG(app_name).slice(10, 18) +
        fE().slice(18, 29) +
        timestamp +
        fB(timestamp)
    ).slice(10, 20);
}

function gA() {
    return generateUUID();
}

function gH() {
    const f1580a = 16;
    return gL(fG(gA()), f1580a);
}

function gG() {
    const f1581b = 8;
    return gL(fG(gA()), f1581b);
}

function gI(str0) {
    return gL(str0, 3);
}

function gJ(str0) {
    return str0.slice(3);
}

function gL(s, i2) {
    return s.slice(0, i2);
}

function jIQ() {
    return fG("jfdvgjk5643790jgvdhnmddhssnyyy9521gfnbvfty").slice(4, 23);
}

function jIA(str1, str2, str3) {
    const g2 = fG(gA());
    const l2 = gL(g2, 7);
    const substring = g2.slice(7, 17);
    const substring2 = g2.slice(17, 24);
    const str4 = l2 + substring + substring2;
    const str5 = str4.slice(5, 9) + str4.slice(14, 18) + str4.slice(20, 22);
    const i2 = gI(str2);
    const j2 = gJ(str2);
    const l3 = gL(str1, 5);
    const substring3 = str1.slice(5);
    const d2 = fD(str1, str5, str3, i2, j2);
    return l2 + l3 + d2.slice(0, 12) + j2 + substring + d2.slice(12, 20) + i2 + substring3 + substring2;
}

function generateHash(ip, timestamp) {
    return iO(ip, timestamp);
}

function generateToken() {
    const h2 = gH();
    const g2 = gG();
    return jIA(h2, g2, jIQ());
}

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
} 
