import { Router } from "express";
import { CategoriesController } from "../controllers/categories.controller";

export const createCategoriesRouter = (categoriesController: CategoriesController) => {
  const categoriesRouter = Router();

  categoriesRouter.get("/", categoriesController.getCategories);

  return categoriesRouter;
};
