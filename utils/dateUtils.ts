export const UTCtoKST = (date: Date) => {
  return new Date(date.getTime() + 9 * 60 * 60 * 1000);
};
