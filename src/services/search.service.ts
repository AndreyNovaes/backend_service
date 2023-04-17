import { poolConnectionClient } from "../database/pgPoolConnection.database";

export async function getSearchProductsService(
  website?: string,
  category?: string,
  search?: string,
  page: number = 1,
  limit: number = 24) {
  let query = "SELECT * FROM scrapped_data WHERE 1 = 1";
  const queryParams = [];

  if (website) {
    query += " AND website = $" + (queryParams.length + 1);
    queryParams.push(website);
  }

  if (category) {
    query += " AND category = $" + (queryParams.length + 1);
    queryParams.push(category);
  }

  if (search) {
    query += " AND description ILIKE $" + (queryParams.length + 1);
    queryParams.push(`%${search}%`);
  }

  const offset = (page - 1) * limit;

  query += " ORDER BY id";
  query += " LIMIT $" + (queryParams.length + 1) + " OFFSET $" + (queryParams.length + 2);
  queryParams.push(limit, offset);

  try {
    const { rows } = await poolConnectionClient.query(query, queryParams);
    return rows;
  } catch (error) {
    console.error("Error querying data:", error);
    throw new Error("Internal server error");
  }
}
