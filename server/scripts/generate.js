const secp = require("ethereum-cryptography/secp256k1");
const {toHex} = require("ethereum-cryptography/utils");

const private_key = secp.utils.randomPrivateKey();

const public_key = secp.getPublicKey(private_key);

console.log("private: ",toHex(private_key));

console.log(toHex(public_key));