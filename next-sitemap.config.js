import client from "./src/lib/mongodb.js";
import { dbName } from "./src/config.js";

const getFastRoutePaths = async () => {
  let connection;
  try {
    connection = await client;
    const db = connection.db(dbName);
    const fastroutes = await db
      .collection("fastroutes")
      .find({}, { projection: { urlSegment: 1 } })
      .toArray();

    return fastroutes.map((route) => ({
      loc: `/tag/${route.urlSegment}`,
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }));
  } catch (e) {
    console.error("Error fetching FastRoute paths:", e);
    return [];
  } finally {
    if (connection) {
      try {
        await connection?.close();
      } catch (closeError) {
        console.error("Error closing MongoDB connection:", closeError);
      }
    }
  }
};

export default {
  siteUrl: process.env.SITE_URL || "https://tagsearcher.lol",
  generateRobotsTxt: true,
  exclude: ["/manifest.webmanifest"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
      },
    ],
  },
  additionalPaths: async () => {
    // const tagRoutes = await getFastRoutePaths();
    // console.log(`[Sitemap] Generated ${tagRoutes.length} FastRoute paths`);
    return [
      {
        loc: "/",
        changefreq: "daily",
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      // ...tagRoutes,
    ];
  },
};
