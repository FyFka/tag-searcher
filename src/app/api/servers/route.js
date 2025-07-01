import client from "@/lib/mongodb";
import { dbName, serverLimitPerPage } from "@/config";

export const serverList = async (req) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10) || 1;
    const search = searchParams.get("s") || "";
    const skip = (page - 1) * serverLimitPerPage;

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

    return new Response(JSON.stringify({ servers, hasMore }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    const res = { message: "Something went wrong. Please try again later.", error: true };
    return new Response(JSON.stringify(res), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};

export const GET = serverList;
