import { Router } from "express";
import { SearchController } from "../controllers/search.controller";

export const createSearchRouter = (searchController: SearchController) => {
  const searchRouter = Router();

  searchRouter.get("/", searchController.getSearchProducts);

  return searchRouter;
}
