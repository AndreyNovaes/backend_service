import { poolConnectionClient } from "../database/pgPoolConnection.database";
import { redisClient } from "../database/redisClient";

export async function getCategoriesService() {
  const query = "SELECT DISTINCT category FROM scrapped_data";
  const cacheKey = "categories";
  try {
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    const { rows } = await poolConnectionClient.query(query);
    const categories = rows.map((row) => row.category);

    const secondsInADay = 86400;
    await redisClient.setex(cacheKey, secondsInADay, JSON.stringify(categories));
    
    return categories;
  } catch (error) {
    console.error("Error querying categories:", error);
    throw new Error("Internal server error");
  }
}
