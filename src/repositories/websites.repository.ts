import { poolConnectionClient } from "../database/pgPoolConnection.database";
import { IWebsitesRepository } from "../interfaces/IWebsites";

export class WebsitesRepository implements IWebsitesRepository {
  constructor(private pool: typeof poolConnectionClient) {}

  async getWebsites(): Promise<string[]> {
    const query = "SELECT DISTINCT website FROM scrapped_data";
    const { rows } = await this.pool.query(query);
    const websites = rows.map((row) => row.website);
    return websites;
  }
}
