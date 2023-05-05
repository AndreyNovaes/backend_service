import { poolConnectionClient } from "../database/pgPoolConnection.database";
import { redisClient } from "../database/redisClient";
import { WebsitesRepository } from "../repositories/websites.repository";
import { WebsitesService } from "../services/websites.service";
import { WebsitesController } from "../controllers/website.controller";

const websitesRepository = new WebsitesRepository(poolConnectionClient);
const websitesService = new WebsitesService(websitesRepository, redisClient);
const websitesController = new WebsitesController(websitesService);

export { websitesController };
