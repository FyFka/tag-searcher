import client from "@/lib/mongodb";
import { dbName, serverLimitPerPage } from "@/config";
import cache from "@/lib/cache.js";

export const serverList = async (req) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10) || 1;
    const search = searchParams.get("s") || "";
    const skip = (page - 1) * serverLimitPerPage;

    const cacheKey = `servers:${search}:${page}`;
    const cached = cache.get(cacheKey);

    if (cached) {
      return new Response(JSON.stringify(cached), { status: 200, headers: { "Content-Type": "application/json" } });
    }

    const connection = await client;
    const db = connection.db(dbName);
    const query = search ? { $text: { $search: search } } : {};

    const results = await db
      .collection("servertags")
      .find(query, { projection: { _id: 0, __v: 0 } })
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
