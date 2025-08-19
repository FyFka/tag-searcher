import { userStoragePrefix } from "@/config";

export const setCookie = (name, value, days) => {
  const wholeName = `${userStoragePrefix}:${name}`;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${wholeName}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};

export const getCookie = (name) => {
  const wholeName = `${userStoragePrefix}:${name}`;
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(wholeName + "="))
    ?.split("=")[1];
};
