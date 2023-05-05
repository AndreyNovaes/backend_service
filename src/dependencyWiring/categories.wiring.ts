import { poolConnectionClient } from "../database/pgPoolConnection.database";
import { redisClient } from "../database/redisClient";
import { CategoriesRepository } from "../repositories/categories.repository";
import { CategoriesService } from "../services/categories.service";
import { CategoriesController } from "../controllers/categories.controller";

const categoriesRepository = new CategoriesRepository(poolConnectionClient);
const categoriesService = new CategoriesService(categoriesRepository, redisClient);
const categoriesController = new CategoriesController(categoriesService);

export { categoriesController };
