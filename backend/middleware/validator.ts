import { APIError } from "encore.dev/api";

export function sanitizeString(input: string, maxLength: number = 1000): string {
  if (!input) return "";
  
  return input
    .trim()
    .replace(/[<>]/g, "")
    .substring(0, maxLength);
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function validateRequired(value: any, fieldName: string): void {
  if (!value || (typeof value === "string" && !value.trim())) {
    throw APIError.invalidArgument(`${fieldName} is required`);
  }
}

export function validateLength(
  value: string,
  fieldName: string,
  min: number,
  max: number
): void {
  if (value.length < min || value.length > max) {
    throw APIError.invalidArgument(
      `${fieldName} must be between ${min} and ${max} characters`
    );
  }
}
