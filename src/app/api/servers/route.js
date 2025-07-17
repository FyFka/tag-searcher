import client from "@/lib/mongodb";
import { dbName, serverLimitPerPage } from "@/config";
import cache from "@/lib/cache.js";
import { parsePage, parseSortBy, parseSearch, getSortByType, parseNSFW, parseCharacters } from "@/lib/parse";

const serverList = async (req) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = parsePage(searchParams.get("page"));
    const search = parseSearch(searchParams.get("s"));
    const sortBy = parseSortBy(searchParams.get("sortBy"));
    const sort = getSortByType(sortBy, search);
    const withNSFW = parseNSFW(searchParams.get("NSFW"));
    const characters = parseCharacters(searchParams.get("c"));
    const skip = (page - 1) * serverLimitPerPage;

    const cacheKey = `${search}:${page}:${sortBy}:${withNSFW}:${characters}:${Date.now()}`;
    const cached = cache.get(cacheKey);

    if (cached) {
      return new Response(JSON.stringify(cached), { status: 200, headers: { "Content-Type": "application/json" } });
    }

    const connection = await client;
    const db = connection.db(dbName);
    const query = {
      ...(search ? { $text: { $search: search } } : {}),
      ...(withNSFW ? {} : { nsfw: withNSFW }),
      ...(characters !== -1 ? { $expr: { $eq: [{ $strLenCP: "$tagName" }, characters] } } : {}),
    };
    const projection = { _id: 0, __v: 0, inviteCode: 0, guildId: 0, categoryId: 0 };

    const results = await db
      .collection("servertags")
      .find(query, { projection })
      .sort(sort)
      .skip(skip)
      .limit(serverLimitPerPage + 1)
      .toArray();

    const hasMore = results.length > serverLimitPerPage;
    const servers = hasMore ? results.slice(0, serverLimitPerPage) : results;

    const responseData = { servers, hasMore };
    cache.set(cacheKey, responseData);

    return new Response(JSON.stringify(responseData), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (e) {
    console.log(e.message);
    const res = { message: "Something went wrong. Please try again later.", error: true };
    return new Response(JSON.stringify(res), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};

export const GET = serverList;
