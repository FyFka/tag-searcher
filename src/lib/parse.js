import { maxSearchInviteCodeLength, maxSearchLength } from "@/config";

export const parsePage = (userPage = "1") => {
  const page = parseInt(userPage || "1", 10);
  return page < 1 ? 1 : page;
};

export const parseSearch = (search = "", maxLength = maxSearchLength) => {
  if (typeof search !== "string") return "";
  const trimmedSearch = search.trim().slice(0, maxLength);
  return trimmedSearch;
};

export const parseSortBy = (userSortBy = "") => {
  const userSortByPrep = typeof userSortBy === "string" ? userSortBy.toLowerCase() : "";

  if (userSortByPrep === "newest") {
    return "newest";
  } else if (userSortByPrep === "visited") {
    return "visited";
  } else if (userSortByPrep === "popular") {
    return "popular";
  } else {
    return "relevant";
  }
};

export const parseNSFW = (userNSFW) => {
  if (userNSFW === "false") return false;
  return true;
};

export const parseCharacters = (userCharacters) => {
  const charNumber = parseInt(userCharacters, 10) || -1;
  if (charNumber === -1 || (charNumber > 1 && charNumber <= 4)) return charNumber;
  return -1;
};

export const getSortByType = (sortBy, search) => {
  const sortByMap = {
    visited: { visits: -1, membersCount: -1 },
    popular: { membersCount: -1 },
    newest: { updatedAt: -1 },
    relevant: search ? { score: { $meta: "textScore" }, membersCount: -1 } : { membersCount: -1 },
  };

  return sortByMap[sortBy] || sortByMap.popular;
};

export const parseInviteCode = (userInviteCode) => {
  if (typeof userInviteCode !== "string") return "";
  return userInviteCode
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, "")
    .slice(0, 48);
};

export const parseText = (name) => (typeof name === "string" ? name.trim() : "");

const inviteDomains = [
  "discord.gg",
  "discord.com",
  "discordapp.com",
  "discord.media",
  "discordapp.net",
  "discordcdn.com",
  "discord.dev",
  "discord.new",
  "discord.gift",
  "discordstatus.com",
  "dis.gd",
  "discord.co",
  "invite.gg",
];

export const parseInviteCodeFromUrl = (url) => {
  if (!url) return "";

  let val = url.trim();
  const valLower = val.toLowerCase();

  const matchedDomain = inviteDomains.find((domain) => valLower.includes(domain));

  if (!matchedDomain) {
    return val.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, maxSearchInviteCodeLength);
  }

  const re = new RegExp(
    `(https?://)?(www\\.)?${matchedDomain.replace(
      /\./g,
      "\\.",
    )}/(?:invite/)?([a-zA-Z0-9_-]{1,${maxSearchInviteCodeLength}})`,
    "i",
  );

  const match = val.match(re);

  if (match && match[3]) {
    return match[3];
  }

  return val.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, maxSearchInviteCodeLength);
};
