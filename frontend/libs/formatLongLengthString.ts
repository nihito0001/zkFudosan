export const formatLongLengthString = (str: string) => {
  if (str) {
    return `${str.slice(0, 10)}...${str.slice(
      str.length - 10,
      str.length
    )}`;
  }
};
