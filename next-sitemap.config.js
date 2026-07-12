import client from "./src/lib/mongodb.js";
import { dbName } from "./src/config.js";

const locales = ["en", "de", "es", "fr", "it", "nl", "pl", "pt", "ru", "tr"];
const defaultLocale = "en";

const localizedPath = (locale, path) => {
  if (locale === defaultLocale) {
    return path;
  }

  return `/${locale}${path}`;
};

const getFastRoutePaths = async () => {
  let connection;

  try {
    connection = await client;
    const db = connection.db(dbName);

    const routes = await db
      .collection("fastroutes")
      .find({}, { projection: { urlSegment: 1 } })
      .toArray();

    return routes.flatMap((route) =>
      locales.map((locale) => ({
        loc: localizedPath(locale, `/tag/${route.urlSegment}`),
        changefreq: "weekly",
        priority: 0.7,
        lastmod: new Date().toISOString(),
      })),
    );
  } catch (e) {
    console.error(e);
    return [];
  } finally {
    await connection?.close();
  }
};

const config = {
  siteUrl: process.env.SITE_URL || "https://tagsearcher.net",

  generateRobotsTxt: true,

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: ["/join/*"],
      },
    ],
  },

  exclude: ["/manifest.webmanifest"],

  additionalPaths: async () => {
    const tagRoutes = await getFastRoutePaths();

    const rootRoutes = locales.map((locale) => ({
      loc: localizedPath(locale, "/"),
      changefreq: "daily",
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }));

    return [...rootRoutes, ...tagRoutes];
  },
};

export default config;
