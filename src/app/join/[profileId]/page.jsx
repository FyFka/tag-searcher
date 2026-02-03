import client from "@/lib/mongodb";
import { dbName } from "@/config";
import { notFound, redirect } from "next/navigation";
import { isRateLimited } from "@/lib/rate-limiter";
import { CaptchaRedirectJoin } from "@/components/captcha-redirect-join/captcha-redirect-join";
import { headers } from "next/headers";

export const metadata = {
  title: "Woah, that's a bit too spicy!",
};

const getInviteCode = async (profileId) => {
  try {
    const connection = await client;
    const db = connection.db(dbName);

    const res = await db
      .collection("servertags")
      .findOneAndUpdate(
        { profileId },
        { $inc: { visits: 1 } },
        { projection: { inviteCode: 1 }, returnDocument: "after" },
      );

    return res?.inviteCode ?? null;
  } catch (e) {
    console.error("Error fetching collections:", e);
    return null;
  }
};
export default async function Redirect({ params }) {
  const [h, p] = await Promise.all([headers(), params]);
  const { profileId } = p;

  const ip = h.get("x-forwarded-for") || h.get("remote-addr") || h.get("srcIp");
  const limited = await isRateLimited(ip);

  if (!limited) {
    const inviteCode = await getInviteCode(profileId);

    if (!inviteCode) return notFound();

    return redirect(`https://discord.com/invite/${inviteCode}`);
  }

  return <CaptchaRedirectJoin profileId={profileId} />;
}
