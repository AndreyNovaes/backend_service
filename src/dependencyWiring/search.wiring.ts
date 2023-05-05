import { poolConnectionClient } from "../database/pgPoolConnection.database";
import { redisClient } from "../database/redisClient";
import { SearchProductsRepository } from "../repositories/search.repository";
import { SearchProductsService } from "../services/search.service";
import { SearchController } from "../controllers/search.controller";

const searchProductsRepository = new SearchProductsRepository(poolConnectionClient);
const searchProductsService = new SearchProductsService(searchProductsRepository, redisClient);
const searchController = new SearchController(searchProductsService);

export { searchController };
