import { IWebsiteService } from "../interfaces/IWebsites";
import { IRedisConnection } from "../interfaces/IRedisDatabaseConnection";

export class WebsitesService {
  constructor(
    private websiteRepository: IWebsiteService,
    private IRedisConnection: IRedisConnection
  ) {}

  async getWebsites(): Promise<string[]> {
    const cacheKey = "websites";
    const cachedData = await this.IRedisConnection.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const websites = await this.websiteRepository.getWebsites();
    const secondsInADay = 86400;
    await this.IRedisConnection.setex(cacheKey, secondsInADay, JSON.stringify(websites));

    return websites;
  }
}
