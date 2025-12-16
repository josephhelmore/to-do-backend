export const isValidId = (id: number): boolean => {
  return Number.isInteger(id) && id > 0;
};
