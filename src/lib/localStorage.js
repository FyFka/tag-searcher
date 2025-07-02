export const localStoragePrefix = "p:0-0-1";
export const getFromLocalStorage = (key) => {
  try {
    const wholeKey = `${localStoragePrefix}:${key}`;
    const item = localStorage.getItem(wholeKey);
    return item;
  } catch (err) {
    return null;
  }
};

export const setToLocalStorage = (key, value) => {
  try {
    const wholeKey = `${localStoragePrefix}:${key}`;
    localStorage.setItem(wholeKey, value);
    return true;
  } catch (err) {
    return false;
  }
};
