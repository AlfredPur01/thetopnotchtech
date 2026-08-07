import bcrypt from "bcryptjs";

export async function verifyAdminCredentials(email: string, password: string): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHashBase64 = process.env.ADMIN_PASSWORD_HASH_BASE64;

  if (!adminEmail || !adminPasswordHashBase64) {
    throw new Error("ADMIN_EMAIL or ADMIN_PASSWORD_HASH_BASE64 environment variable is not set");
  }

  // Bcrypt hashes contain `$`, which Next.js's env loader treats as variable-expansion
  // syntax and silently mangles — stored base64-encoded to avoid that.
  const adminPasswordHash = Buffer.from(adminPasswordHashBase64, "base64").toString("utf-8");

  if (email.trim().toLowerCase() !== adminEmail.trim().toLowerCase()) {
    return false;
  }

  return bcrypt.compare(password, adminPasswordHash);
}
