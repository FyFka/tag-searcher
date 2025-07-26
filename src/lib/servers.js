import client from "@/lib/mongodb";
import { dbName, serverLimitPerPage } from "@/config";
import { parseSortBy, parseSearch, getSortByType, parseNSFW, parseCharacters } from "@/lib/parse";

export const getServers = async (userSearch = "", userSortBy = "relevant", userNsfw = true, userCharacters = -1) => {
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
        .limit(serverLimitPerPage + 1)
        .toArray(),
      db.collection("stats").findOne({}, { projection: { _id: 0, __v: 0 } }),
    ]);

    const hasMore = results.length > serverLimitPerPage;
    const servers = hasMore ? results.slice(0, serverLimitPerPage) : results;

    return { servers, stats, hasMore, search, sortBy, NSFW: withNSFW, characters };
  } catch (e) {
    console.error("Error fetching collections:", e);
    return null;
  }
};

export const getFastRoute = async (segment) => {
  try {
    const connection = await client;
    const db = connection.db(dbName);
    const fastRoute = db.collection("fastroutes").findOne({ urlSegment: segment }, { projection: { _id: 0, __v: 0 } });

    if (!fastRoute) {
      return null;
    }

    return fastRoute;
  } catch (e) {
    console.error("Error fetching collections:", e);
    return null;
  }
};
