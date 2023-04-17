import { Router } from "express";
import { getWebsitesController } from "../controllers/website.controller";

const websitesRouter = Router();

websitesRouter.get("/", getWebsitesController);

export { websitesRouter };

