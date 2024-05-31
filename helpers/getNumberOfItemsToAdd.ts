export const getNumberOfItemsToAdd = (maxNumberOfItems: number): number => {
  // Adjusted range
  return Math.floor(Math.random() * (maxNumberOfItems - 1) + 1);
};
