import CryptoJS from "crypto-js";

export function encryptPassword(password : string) : string {
  const salt = "secret";

  const key = CryptoJS.PBKDF2(password, CryptoJS.enc.Utf8.parse(salt), {
    keySize: 512 / 32,
    iterations: 10000,
  });

  const ciphertext = CryptoJS.AES.encrypt(password, key, {
    iv: CryptoJS.enc.Utf8.parse(salt),
  });

  return ciphertext.toString();
}

export function verifyPassword(password :string , storedEncryptedPassword : string) : boolean {
  const salt = 'secret'
  const key = CryptoJS.PBKDF2(password, salt, {
    keySize: 512 / 32,
    iterations: 10000,
  });

  const decrypted = CryptoJS.AES.decrypt(storedEncryptedPassword, key, {
    iv: CryptoJS.enc.Utf8.parse(salt),
  });

  return decrypted.toString(CryptoJS.enc.Utf8) === password;
}
