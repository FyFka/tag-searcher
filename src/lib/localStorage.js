import { userStoragePrefix } from "@/config";

export const getFromLocalStorage = (key) => {
  try {
    const wholeKey = `${userStoragePrefix}:${key}`;
    const item = localStorage.getItem(wholeKey);
    return item;
  } catch (err) {
    return null;
  }
};

export const setToLocalStorage = (key, value) => {
  try {
    const wholeKey = `${userStoragePrefix}:${key}`;
    localStorage.setItem(wholeKey, value);
    return true;
  } catch (err) {
    return false;
  }
};
