export const randomNumBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
export const generateUniqNumber = (array, key) => {
  const random = randomNumBetween(1_000_000, 9_999_999);
  const item = array.find((item) => item[key] === random);
  if (!item) return random;
  return generateUniqNumber(array, key);
};
