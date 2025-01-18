import crypto from "crypto";

export const encryptData = (data: string): { encrypted: string; iv: string } => {
  const secretKey = process.env.SECRET_KEY || "your32characterlongsecretkeyhere";
  if (secretKey.length !== 32) {
    throw new Error("Secret key must be 32 characters long for AES-256-CBC");
  }
  

  const key = Buffer.from(secretKey, "utf-8");
  const iv = crypto.randomBytes(16); // Generate random IV

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");

  return { encrypted, iv: iv.toString("hex") };
};

// Function to decrypt data (if needed later)

export const decryptData = (
  encrypted: string | undefined,
  iv: string | undefined
): string | undefined => {
  if (!encrypted || !iv) {
    console.error("Missing encrypted data or IV");
    return undefined;
  }
  console.log(encrypted);
  

  try {
    const secretKey = process.env.SECRET_KEY || "your32characterlongsecretkeyhere";
    if (secretKey.length !== 32) {
      throw new Error("Secret key must be 32 characters long for AES-256-CBC");
    }

    const key = Buffer.from(secretKey, "utf-8");
    const ivBuffer = Buffer.from(iv, "hex");

    console.log("Decrypting with Key:", key.toString("hex"));
    console.log("Decrypting with IV:", ivBuffer.toString("hex"));

    const decipher = crypto.createDecipheriv("aes-256-cbc", key, ivBuffer);
    console.log(decipher);
    

    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");

    console.log("Decrypted Data:", decrypted);
    return decrypted;
  } catch (error: any) {
    console.error("Decryption error:", error.message);
    throw new Error("Failed to decrypt data. Check key, IV, and encrypted data integrity.");
  }
};





// You could also handle encrypting data in this module if needed
