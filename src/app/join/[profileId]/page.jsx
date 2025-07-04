import client from "@/lib/mongodb";
import { dbName } from "@/config";
import { notFound } from "next/navigation";
import { redirect } from "next/navigation";

const getInviteCode = async (profileId) => {
  try {
    const connection = await client;
    const db = connection.db(dbName);

    const res = await db
      .collection("servertags")
      .findOneAndUpdate(
        { profileId },
        { $inc: { visits: 1 } },
        { projection: { inviteCode: 1 }, returnDocument: "after" }
      );

    return res?.inviteCode ?? null;
  } catch (e) {
    console.error("Error fetching collections:", e);
    return null;
  }
};
export default async function Redirect({ params }) {
  const { profileId } = await params;

  const InviteCode = await getInviteCode(profileId);

  if (!InviteCode) return notFound();

  return redirect(`https://discord.com/invite/${InviteCode}`);
}
