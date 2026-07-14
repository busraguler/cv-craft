export function formatDateTime(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function formatDateRange(
  startDate: string,
  endDate: string,
  current = false,
): string {
  const start = startDate.trim();
  const end = current ? "Present" : endDate.trim();

  if (start && end) {
    return `${start} - ${end}`;
  }

  return start || end;
}

export function splitLines(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}
