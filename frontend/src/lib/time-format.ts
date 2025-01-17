export const formatTimeFromTimestamp = (timestamp: string) => {
  return new Date(timestamp).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};
