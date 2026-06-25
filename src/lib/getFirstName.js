export function getFirstName(displayName) {
  if (!displayName || typeof displayName !== "string") {
    return "";
  }

  return displayName.trim().split(/\s+/)[0] || "";
}
