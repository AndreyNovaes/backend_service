import { Router } from "express";
import { getSearchProductsController } from "../controllers/search.controller";

const searchRouter = Router();

searchRouter.get("/", getSearchProductsController);

export { searchRouter };
