// date format

export function toDatetimeLocalString(date?: string | null): string {
  if (!date) return ''; // return empty string if null or undefined

  const d = new Date(date);
  if (isNaN(d.getTime())) return ''; // invalid date string

  const pad = (n: number) => String(n).padStart(2, '0');
  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}


// field name format

export function formatObjectKey(key: string) {
  return key
    ?.replace(/_/g, " ")
    ?.replace(/([A-Z])/g, " $1")
    ?.replace(/\s+/g, " ")
    ?.trim()
    ?.split(" ")
    ?.map(word => word.charAt(0).toUpperCase() + word.slice(1))
    ?.join(" ")

}