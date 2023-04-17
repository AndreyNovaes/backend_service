import { Request, Response, NextFunction } from "express";
import { getSearchProductsService } from "../services/search.service";

export async function getSearchProductsController(req: Request, res: Response, next: NextFunction) {
  const website = req.query.website as string | undefined;
  const category = req.query.category as string | undefined;
  const search = req.query.search as string | undefined;
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 24;

  try {
    const products = await getSearchProductsService(website, category, search, page, limit);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
}
