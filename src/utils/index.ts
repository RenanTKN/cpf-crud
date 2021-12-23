export const formatDate = (date: Date) =>
  new Date(date).toLocaleDateString("pt-br");

export const formatDateField = (date: string) => {
  const [day, month, year] = new Date(date).toLocaleDateString("pt-br").split("/");
  return `${year}-${month}-${day}`;
};
