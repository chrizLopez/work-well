export const generateId = () => {
  const currentdate = new Date();
  const id =
    currentdate.getDate() +
    +(currentdate.getMonth() + 1) +
    currentdate.getFullYear() +
    currentdate.getHours() +
    currentdate.getMinutes() +
    currentdate.getSeconds();
  return id;
};

export const secondsToMinutes = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  // Ensure two digits for seconds
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${formattedSeconds}`;
};
