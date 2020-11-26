export const formatDate = inputDate => {
  let date = new Date(inputDate);
  return `${appendZero(date.getDate())}/${appendZero(date.getMonth())}/${date.getFullYear()} ${appendZero(date.getHours())}:${appendZero(date.getMinutes())}:${appendZero(date.getSeconds())}`;
};

export const appendZero = number => {
  return number > 9 ? number : `0${number}`;
};
