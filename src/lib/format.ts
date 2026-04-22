/** Format duration in minutes as a short Turkish string: "2 sa", "1 sa 30 dk", "45 dk". */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} dk`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (m === 0) return `${h} sa`;
  return `${h} sa ${m} dk`;
}

/** Format a flag tone label in Turkish for cards. */
export const FLAG_LABEL: Record<string, string> = {
  editor: "Editör Seçimi",
  new: "Yeni",
  limited: "Sınırlı",
  trending: "Trend",
};