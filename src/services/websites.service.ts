import { poolConnectionClient } from "../database/pgPoolConnection.database";
import { redisClient } from "../database/redisClient";

export async function getWebsitesService() {
  const query = "SELECT DISTINCT website FROM scrapped_data";
  const cacheKey = "websites";
  try {
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    const { rows } = await poolConnectionClient.query(query);
    const websites = rows.map((row) => row.website);

    const secondsInADay = 86400;
    await redisClient.setex(cacheKey, secondsInADay, JSON.stringify(websites));
    
    return websites;
  } catch (error) {
    console.error("Error querying websites:", error);
    throw new Error("Internal server error");
  }
}

