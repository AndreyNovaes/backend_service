import { poolConnectionClient } from "../database/pgPoolConnection.database";

export async function getWebsitesService() {
  const query = "SELECT DISTINCT website FROM scrapped_data";
  try {
    const { rows } = await poolConnectionClient.query(query);
    return rows.map((row) => row.website);
  } catch (error) {
    console.error("Error querying websites:", error);
    throw new Error("Internal server error");
  }
}
