/** Format an ISO date as a Dutch long date. */
export function formatDate(isoDate: string): string {
  try {
    return new Date(isoDate).toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return isoDate;
  }
}
