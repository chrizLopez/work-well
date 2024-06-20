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
