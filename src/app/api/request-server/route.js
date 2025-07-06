import client from "@/lib/mongodb";
import { dbName, serverLimitPerPage } from "@/config";
import { parseInviteCode } from "@/lib/parse";
import { validateTurnstileToken } from "next-turnstile";

export const serverRequest = async (req) => {
  try {
    const body = await req.json();
    const inviteCode = parseInviteCode(body?.inviteCode || "");

    if (inviteCode.length < 1) {
      return new Response(JSON.stringify({ type: "error", message: "Invalid invite code" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // const validationResponse = await validateTurnstileToken({
    //   token,
    //   secretKey: process.env.TURNSTILE_SECRET_KEY,
    //   sandbox: process.env.NODE_ENV === "development",
    // });

    // if (!validationResponse.success) {
    //   return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    // }

    const connection = await client;
    const db = connection.db(dbName);

    const collection = db.collection("requestedServerTags");
    const existing = await collection.findOne({ inviteCode, status: "pending" }, { projection: { _id: 1 } });

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
      resolvedAt: now,
      status: "pending",
    });

    return new Response(
      JSON.stringify({
        message: "Server submitted successfully. It will be processed within 24 hours.",
        type: "success",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (e) {
    const res = { message: "Something went wrong. Please try again later.", hasError: true };
    return new Response(JSON.stringify(res), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};

export const POST = serverRequest;
