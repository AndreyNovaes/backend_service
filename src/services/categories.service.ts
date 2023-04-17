import { poolConnectionClient } from "../database/pgPoolConnection.database";

export async function getCategoriesService() {
  const query = "SELECT DISTINCT category FROM scrapped_data";
  try {
    const { rows } = await poolConnectionClient.query(query);
    return rows.map((row) => row.category);
  } catch (error) {
    console.error("Error querying categories:", error);
    throw new Error("Internal server error");
  }
}
