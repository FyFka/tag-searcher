import client from "@/lib/mongodb";
import { dbName, serverLimitPerPage } from "@/config";
import { parseSortBy, parseSearch, getSortByType, parseNSFW, parseCharacters } from "@/lib/parse";

export const getTrendingTagsList = async () => {
  try {
    const connection = await client;
    const db = connection.db(dbName);
    const trendingTags = await db
      .collection("fastroutes")
      .find({}, { projection: { urlSegment: 1, tagName: 1, _id: 0 } })
      .toArray();
    return trendingTags;
  } catch (err) {
    return [];
  }
};

export const getStats = async () => {
  try {
    const connection = await client;
    const db = connection.db(dbName);
    const stats = await db.collection("stats").findOne({}, { projection: { _id: 0, __v: 0 } });
    return stats;
  } catch (e) {
    console.log(e.message);
    return null;
  }
};

export const getServers = async (
  userSearch = "",
  userSortBy = "relevant",
  userNsfw = true,
  userCharacters = -1,
  serversLimit = serverLimitPerPage,
) => {
  try {
    const search = parseSearch(userSearch);
    const sortBy = parseSortBy(userSortBy);
    const sort = getSortByType(sortBy, search);
    const withNSFW = parseNSFW(userNsfw);
    const characters = parseCharacters(userCharacters);

    const connection = await client;
    const db = connection.db(dbName);

    const query = {
      ...(search ? { $text: { $search: search } } : {}),
      ...(withNSFW ? {} : { nsfw: withNSFW }),
      ...(characters !== -1 ? { $expr: { $eq: [{ $strLenCP: "$tagName" }, characters] } } : {}),
    };
    const projection = { _id: 0, __v: 0, inviteCode: 0, guildId: 0, categoryId: 0 };

    const [results, stats] = await Promise.all([
      db
        .collection("servertags")
        .find(query, { projection })
        .sort(sort)
        .limit(serversLimit + 1)
        .toArray(),
      db.collection("stats").findOne({}, { projection: { _id: 0, __v: 0 } }),
    ]);

    const hasMore = results.length > serversLimit;
    const servers = hasMore ? results.slice(0, serversLimit) : results;

    return { servers, stats, hasMore, search, sortBy, NSFW: withNSFW, characters };
  } catch (e) {
    console.log(e.message);
    return null;
  }
};

export const getFastRoute = async (segment) => {
  try {
    const connection = await client;
    const db = connection.db(dbName);
    const fastRoute = await db
      .collection("fastroutes")
      .findOne({ urlSegment: segment }, { projection: { _id: 0, __v: 0 } });

    if (!fastRoute) {
      return null;
    }

    return fastRoute;
  } catch (e) {
    console.log(e.message);
    return null;
  }
};
