import client from "@/lib/mongodb";
import { dbName } from "@/config";
import { parseText } from "@/lib/parse";
import { validateRecaptchaToken } from "@/lib/recaptcha";

const contactUs = async (req) => {
  try {
    const body = await req.json();
    const token = body?.turnstileToken || "";

    const isRecaptchaValid = await validateRecaptchaToken(token);

    if (!isRecaptchaValid) {
      return new Response(
        JSON.stringify({ type: "error", message: "Hmm... that security check didn’t pass. Give it another shot!" }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    }

    const name = parseText(body?.name);
    const message = parseText(body?.message);
    const email = parseText(body?.email);

    if (name.length < 1 || message.length < 1 || email.length < 1) {
      return new Response(JSON.stringify({ type: "error", message: "Please fill out all required fields" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const connection = await client;
    const db = connection.db(dbName);

    const collection = db.collection("contacts");

    const now = new Date();
    await collection.insertOne({ name, message, email, createdAt: now });

    return new Response(
      JSON.stringify({
        message: "Thanks for your message! We'll get back to you as soon as possible",
        type: "success",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.log(e.message);
    const res = { message: "Something went wrong. Please try again later", hasError: true };
    return new Response(JSON.stringify(res), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};

export const POST = contactUs;
