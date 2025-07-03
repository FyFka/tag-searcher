export const parsePage = (userPage = "1") => {
  const page = parseInt(userPage || "1", 10);
  return page < 1 ? 1 : page;
};

export const parseSearch = (search = "") => {
  if (typeof search !== "string") return "";
  const trimmedSearch = search.trim().slice(0, 200);
  return trimmedSearch;
};

export const parseSortBy = (userSortBy = "") => {
  const userSortByPrep = userSortBy.toLowerCase();

  if (userSortByPrep === "newest") {
    return "newest";
  } else if (userSortByPrep === "relevant") {
    return "relevant";
  } else {
    return "popular";
  }
};

export const parseNSFW = (userNSFW) => {
  if (userNSFW === "false") return false;
  return true;
};

export const getSortByType = (sortBy, search) => {
  const sortByMap = {
    popular: { membersCount: -1 },
    newest: { updatedAt: -1 },
    relevant: search ? { score: { $meta: "textScore" }, _id: -1 } : { membersCount: -1 },
  };

  return sortByMap[sortBy] || sortByMap.popular;
};
