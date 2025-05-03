export const convertToUTCTimestamp = (dateString: string): number => {
  const date = new Date(dateString);
  const timestamp = Math.floor(date.getTime() / 1000);
  return timestamp;
};
export const formatTimestamp = (seconds: number): string => {
  if (!seconds) return "";
  const date = new Date(seconds * 1000);
  return date.toLocaleString();
};
