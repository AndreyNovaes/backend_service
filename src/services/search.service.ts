import { poolConnectionClient } from "../database/pgPoolConnection.database";

export async function getSearchProductsService(website?: string, category?: string, search?: string) {
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

  try {
    const { rows } = await poolConnectionClient.query(query, queryParams);
    return rows;
  } catch (error) {
    console.error("Error querying data:", error);
    throw new Error("Internal server error");
  }
}
