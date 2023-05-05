import { IRedisConnection } from "../interfaces/IRedisDatabaseConnection";
import { IPaginatedProducts, ISearchProductsRepository, ISearchParams } from "../interfaces/ISearchProducts";

export class SearchProductsService {
  constructor(
    private searchProductsRepository: ISearchProductsRepository,
    private IRedisConnection: IRedisConnection
  ) {}

  async searchProducts(searchParams: ISearchParams): Promise<IPaginatedProducts> {
    const cacheKey = `search:${JSON.stringify(searchParams)}`;
    const cachedData = await this.IRedisConnection.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const products = await this.searchProductsRepository.getSearchProducts(searchParams);
    const secondsInADay = 86400;
    await this.IRedisConnection.setex(cacheKey, secondsInADay, JSON.stringify(products));

    return products;
  }
}