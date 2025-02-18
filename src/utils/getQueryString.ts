export const getQueryString = (obj: Record<string, string>) =>
  Object.entries(obj)
    .filter(([, value]) => Boolean(value))
    .reduce((accumulator, [key, value], index, array) => {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(value);
      const queryPart = `${encodedKey}=${encodedValue}`;
      if (index < array.length - 1) {
        return `${accumulator}${queryPart}&`;
      } else {
        return `${accumulator}${queryPart}`;
      }
    }, "");
