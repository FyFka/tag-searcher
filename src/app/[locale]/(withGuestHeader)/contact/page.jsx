import { ContactUs } from "@/components/contact-us";
import { getTranslations } from "next-intl/server";
import { getAlternates } from "@/lib/metadata";

export const generateMetadata = async () => {
  const t = await getTranslations("metadata.contact");
  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "Discord special name",
      "Discord channel symbols",
      "Discord guilds list",
      "Discord server tags",
      "Discord badges",
      "Discord tags",
      "Server tag directory",
      "Username badges 2026",
      "Discord server icons",
      "Discord servers",
    ],
    alternates: getAlternates("/contact"),
  };
};

export default function ContactPage() {
  return <ContactUs />;
}
