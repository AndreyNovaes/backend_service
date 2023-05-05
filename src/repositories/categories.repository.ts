import { ICategoriesRepository } from "../interfaces/ICategories";
import { poolConnectionClient } from "../database/pgPoolConnection.database";

export class CategoriesRepository implements ICategoriesRepository {
  constructor(private pool: typeof poolConnectionClient) {}

  async getCategories(): Promise<string[]> {
    const query = "SELECT DISTINCT category FROM scrapped_data";
    const { rows } = await this.pool.query(query);
    const categories = rows.map((row) => row.category);
    return categories;
  }
}
