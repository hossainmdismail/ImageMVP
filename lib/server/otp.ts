import crypto from "node:crypto";
import { calculateAgeFromDateOfBirth } from "@/lib/utils/age";
import { normalizeBangladeshPhone } from "@/lib/utils/phone";

const SMS_API_URL = "http://bulksmsbd.net/api/smsapi";
const BULKSMSBD_SUCCESS_CODES = new Set(["202"]);
const BULKSMSBD_ERROR_CODES = new Set([
  "1002",
  "1003",
  "1005",
  "1006",
  "1007",
  "1011",
  "1012",
  "1013",
  "1014",
  "1015",
  "1016",
  "1017",
  "1018",
  "1019",
  "1020",
  "1021"
]);

export class BulkSmsError extends Error {
  constructor(
    message: string,
    public readonly kind: "provider" | "transport",
    public readonly responseText?: string
  ) {
    super(message);
    this.name = "BulkSmsError";
  }
}

export function parseAge(value: string) {
  const normalized = value.trim();
  const firstNumericToken = normalized.match(/\d+/)?.[0] || "";
  const age = Number(firstNumericToken || normalized);

  if (!Number.isFinite(age) || age < 8 || age > 100) {
    throw new Error("Enter a valid age.");
  }

  return age;
}

export { normalizeBangladeshPhone };

export function generateOtpCode() {
  return String(crypto.randomInt(1000, 10000));
}

export function hashOtp(phone: string, otp: string) {
  const secret = process.env.OTP_SECRET || "ride-story-otp-secret";
  return crypto.createHash("sha256").update(`${phone}:${otp}:${secret}`).digest("hex");
}

export function isOtpExpired(expiresAt: string) {
  return new Date(expiresAt).getTime() < Date.now();
}

function extractBulkSmsCode(responseText: string) {
  const normalized = responseText.replace(/^\uFEFF/, "").trim();
  const match = normalized.match(/\b(202|1002|1003|1005|1006|1007|1011|1012|1013|1014|1015|1016|1017|1018|1019|1020|1021)\b/);
  return match?.[1] || null;
}

export async function sendOtpSms(phone: string, otp: string) {
  const apiKey = process.env.BULKSMSBD_API_KEY;
  const senderId = process.env.BULKSMSBD_SENDER_ID;

  if (!apiKey || !senderId) {
    throw new Error("BulkSMSBD credentials are missing.");
  }

  const message = `Your Ride Story OTP is ${otp}. It will expire in 5 minutes.`;
  const body = new URLSearchParams({
    api_key: apiKey,
    type: "text",
    senderid: senderId,
    number: phone,
    message
  });

  const response = await fetch(SMS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: body.toString()
  });

  const text = await response.text();

  if (!response.ok) {
    throw new BulkSmsError(`BulkSMSBD send failed: ${response.status} ${text}`, "transport", text);
  }

  const providerCode = extractBulkSmsCode(text);

  if (providerCode && BULKSMSBD_ERROR_CODES.has(providerCode)) {
    throw new BulkSmsError(`BulkSMSBD send failed: ${text}`, "provider", text);
  }

  if (providerCode && BULKSMSBD_SUCCESS_CODES.has(providerCode)) {
    return text;
  }

  if (/submitted successfully/i.test(text)) {
    return text;
  }

  return text;
}
