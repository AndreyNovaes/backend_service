import { Router } from "express";
import { WebsitesController } from "../controllers/website.controller";

export const createWebsitesRouter = (websitesController: WebsitesController) => {
  const websitesRouter = Router();

  websitesRouter.get("/", websitesController.getWebsites);

  return websitesRouter;
}
