import { poolConnectionClient } from "../database/pgPoolConnection.database";
import { redisClient } from "../database/redisClient";

export async function getSearchProductsService(
  website?: string,
  category?: string,
  search?: string,
  page: number = 1,
  limit: number = 24) {

  let baseQuery = "FROM scrapped_data WHERE 1 = 1";
  const queryParams = [];

  if (website) {
    baseQuery += " AND website = $" +
     (queryParams.length + 1);
    queryParams.push(website);
  }

  if (category) {
    baseQuery += " AND category = $" + (queryParams.length + 1);
    queryParams.push(category);
  }

  if (search) {
    baseQuery += " AND description ILIKE $" + (queryParams.length + 1);
    queryParams.push(`%${search}%`);
  }

  const countQuery = "SELECT COUNT(*) " + baseQuery;

  const dataQuery = "SELECT * " + baseQuery + " ORDER BY id LIMIT $" + (queryParams.length + 1) + " OFFSET $" + (queryParams.length + 2);
  const offset = page * limit - limit;
  queryParams.push(limit, offset);

  const cacheKey = `search:${website}:${category}:${search}:${page}:${limit}`;
  try {
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const countResult = await poolConnectionClient.query(countQuery, queryParams.slice(0, -2));
    const totalCount = parseInt(countResult.rows[0].count, 10);

    const { rows: data } = await poolConnectionClient.query(dataQuery, queryParams);

    const result = {
      data,
      total: totalCount
    };

    // cachea os resultados por 1 hora (3600 segundos)
    await redisClient.setex(cacheKey, 3600, JSON.stringify(result));

    return result;
  } catch (error) {
    console.error("Error querying data:", error);
    throw new Error("Error querying data");
  }
}

