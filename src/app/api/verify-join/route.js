import client from "@/lib/mongodb";
import { parseText } from "@/lib/parse";
import { validateRecaptchaToken } from "@/lib/recaptcha";
import { dbName } from "@/config";

const verifyJoin = async (req) => {
  try {
    const body = await req.json();
    const profileId = parseText(body?.profileId);
    const token = body?.turnstileToken || "";

    const isRecaptchaValid = await validateRecaptchaToken(token);

    if (!isRecaptchaValid) {
      return new Response(
        JSON.stringify({ type: "error", message: "Hmm... that security check didn’t pass. Give it another shot!" }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    }

    const connection = await client;
    const db = connection.db(dbName);

    const res = await db
      .collection("servertags")
      .findOneAndUpdate(
        { profileId },
        { $inc: { visits: 1 } },
        { projection: { inviteCode: 1 }, returnDocument: "after" },
      );

    return new Response(JSON.stringify({ inviteCode: res?.inviteCode, hasError: false }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log(err);
    const res = {
      message: "Failed to get invite code, if this problem persists invite code may be invalid",
      hasError: true,
    };
    return new Response(JSON.stringify(res), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};

export const POST = verifyJoin;
