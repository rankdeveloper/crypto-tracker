export const formatLastUpdated = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};
