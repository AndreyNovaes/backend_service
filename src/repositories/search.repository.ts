import { poolConnectionClient } from "../database/pgPoolConnection.database";
import { IPaginatedProducts, ISearchProductsRepository, ISearchParams } from "../interfaces/ISearchProducts";

export class SearchProductsRepository implements ISearchProductsRepository {
  constructor(private pool: typeof poolConnectionClient) { }

  async getSearchProducts(
    { website, category, search, page, limit }: ISearchParams,
  ): Promise<IPaginatedProducts> {
    let baseQuery = "FROM scrapped_data WHERE 1 = 1";
    const queryParams = [];

    if (website) {
      baseQuery += " AND website = $" + (queryParams.length + 1);
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

    const dataQuery =
      "SELECT * " +
      baseQuery +
      " ORDER BY id LIMIT $" +
      (queryParams.length + 1) +
      " OFFSET $" +
      (queryParams.length + 2);
    const offset = page * limit - limit;
    queryParams.push(limit, offset);

    const countResult = await this.pool.query(countQuery, queryParams.slice(0, -2));
    const totalCount = parseInt(countResult.rows[0].count, 10);

    const { rows: data } = await this.pool.query(dataQuery, queryParams);

    const result = {
      data,
      total: totalCount,
    };

    return result;
  }
}
