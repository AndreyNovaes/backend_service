export interface IWebsitesRepository {
  getWebsites(): Promise<string[]>;
}

export interface IWebsiteService {
  getWebsites(): Promise<string[]>;
}


