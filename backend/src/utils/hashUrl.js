import crypto from "crypto"

const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function toBase62(buffer) {
  let num = BigInt("0x" + buffer.toString("hex"));
  let result = "";
  while (num > 0n) {
    result = chars[Number(num % 62n)] + result;
    num = num / 62n;
  }
  return result || "0";
}

export function hashUrl(longUrl) {
  const hash = crypto.createHash("sha256").update(longUrl).digest();
  return toBase62(hash); 
}

