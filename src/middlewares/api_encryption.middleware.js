import crypto from "crypto";
import { Config } from "../config/index.js";

const algorithm = "aes-256-cbc";
const secret_key = Buffer.from(Config.AES_ENCRYPTION_KEY, "hex");
const iv_length = 16;

const encrypt = (text) => {
    const iv = crypto.randomBytes(iv_length);
    const cipher = crypto.createCipheriv(algorithm, secret_key, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return iv.toString("hex") + ":" + encrypted;
};

const decrypt = (text) => {
    const text_parts = text.split(":");
    const iv = Buffer.from(text_parts.shift(), "hex");
    const encrypted_text = text_parts.join(":");
    const decipher = crypto.createDecipheriv(algorithm, secret_key, iv);
    let decrypted = decipher.update(encrypted_text, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
};

const decrypt_request = (req, res, next) => {
    if (req.body && req.body.itAm_Lfdwnk_sq) {
        try {
            const decrypted_data = decrypt(req.body.itAm_Lfdwnk_sq);
            req.body = JSON.parse(decrypted_data);
        } catch (err) {
            return res.status(400).json({ error: "Invalid encrypted data" });
        }
    }
    next();
};

const encrypt_response = (req, res, next) => {
    const original_json = res.json;
    res.json = function (body) {
        if (res.locals.skipEncryption) {
            return original_json.call(this, body);
        }
        const encrypted_body = encrypt(JSON.stringify(body));
        return original_json.call(this, { itAm_Lfdwnk_sq: encrypted_body });
    };
    next();
};

// Function to skip encryption for specific routes
const skip_encryption = (req, res, next) => {
    res.locals.skipEncryption = true;
    next();
};

export { decrypt_request, encrypt_response, skip_encryption };
