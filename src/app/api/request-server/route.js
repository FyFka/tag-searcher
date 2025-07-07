import client from "@/lib/mongodb";
import { dbName, maxSearchInviteCodeLength, serverRequestLimitPerPage } from "@/config";
import { parseInviteCode, parsePage, parseSearch } from "@/lib/parse";

const serverRequestList = async (req) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = parsePage(searchParams.get("page"));
    const search = parseSearch(searchParams.get("s"), maxSearchInviteCodeLength);
    const skip = (page - 1) * serverRequestLimitPerPage;

    const connection = await client;
    const db = connection.db(dbName);
    const collection = db.collection("requestedservertags");

    const query = search ? { inviteCode: { $regex: search, $options: "i" } } : {};
    const projection = { _id: 0, __v: 0 };

    const [total, items] = await Promise.all([
      collection.countDocuments(query),
      collection
        .find(query, { projection })
        .sort({ requestedAt: -1 })
        .skip(skip)
        .limit(serverRequestLimitPerPage)
        .toArray(),
    ]);

    return new Response(
      JSON.stringify({ items, page, total, totalPages: Math.ceil(total / serverRequestLimitPerPage) }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.log(e.message);
    const res = { message: "Failed to load data", hasError: true };
    return new Response(JSON.stringify(res), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};

export const GET = serverRequestList;

const serverRequest = async (req) => {
  try {
    const body = await req.json();
    const inviteCode = parseInviteCode(body?.inviteCode || "");

    if (inviteCode.length < 1) {
      return new Response(JSON.stringify({ type: "error", message: "Invalid invite code" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const connection = await client;
    const db = connection.db(dbName);

    const collection = db.collection("requestedservertags");
    const existing = await collection.findOne({ inviteCode, status: "Pending" }, { projection: { _id: 1 } });

    if (existing) {
      return new Response(
        JSON.stringify({ message: "This server has already been submitted and is being processed.", type: "error" }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }

    const now = new Date();
    await collection.insertOne({
      inviteCode,
      requestedAt: now,
      status: "Pending",
    });

    return new Response(
      JSON.stringify({
        message: "Server submitted successfully. It will be processed within 24 hours.",
        type: "success",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.log(e.message);
    const res = { message: "Something went wrong. Please try again later.", hasError: true };
    return new Response(JSON.stringify(res), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};

export const POST = serverRequest;
