export const getCurrentFormattedDateTime = () => {
  const now = new Date();

  const dateOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDate = now.toLocaleDateString("en-GB", dateOptions);
  const formattedTime = now
    .toLocaleTimeString("en-GB", timeOptions)
    .toLowerCase();

  return `${formattedDate}, ${formattedTime}`;
};
