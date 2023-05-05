import { IRedisConnection } from "../interfaces/IRedisDatabaseConnection";
import { ICategoriesRepository } from "../interfaces/ICategories";

export class CategoriesService {
  constructor(
    private categoryRepository: ICategoriesRepository,
    private IRedisConnection: IRedisConnection
  ) {}

  async getCategories(): Promise<string[]> {
    const cacheKey = "categories";
    const cachedData = await this.IRedisConnection.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const categories = await this.categoryRepository.getCategories();
    const secondsInADay = 86400;
    await this.IRedisConnection.setex(cacheKey, secondsInADay, JSON.stringify(categories));

    return categories;
  }
}
