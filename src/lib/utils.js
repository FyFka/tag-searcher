export const debounce = (callback, wait) => {
  let timeoutId = null;

  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
};

export const formatNumber = (num) => {
  if (typeof num !== "number") return "0";
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";

  return num.toString();
};

export const createQueryWithDefaultParams = (search, sortBy, NSFW, characters, page = 1) => {
  const defaultParams = { s: "", sortBy: "relevant", nsfw: true, c: -1, page: 1 };
  const currentParams = { s: search, sortBy, nsfw: NSFW, c: characters, page };

  const query = Object.entries(currentParams).reduce((acc, [key, value]) => {
    if (value !== defaultParams[key]) acc[key] = value;
    return acc;
  }, {});

  return new URLSearchParams(query).toString();
};
