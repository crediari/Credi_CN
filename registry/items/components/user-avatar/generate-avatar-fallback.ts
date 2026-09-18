export function generateAvatarFallback(name: string | null | undefined): string {
  if (!name) {
    return "";
  }

  const nameParts = name.trim().split(/\s+/);

  if (nameParts.length === 1) {
    return nameParts[0] ?? "";
  }

  const firstLetter = nameParts[0]?.split("")[0];
  const lastLetter = nameParts[nameParts.length - 1]?.split("")[0];

  return `${firstLetter ?? ""}${lastLetter ?? ""}`;
}
