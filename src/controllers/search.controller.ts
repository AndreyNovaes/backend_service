import { NextFunction, Request, Response } from "express";
import { SearchProductsService } from "../services/search.service";

export class SearchController {
  constructor(private searchProductsService: SearchProductsService) {}

  getSearchProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { website, category, search } = req.query;
      const searchParams = {
        website: typeof website === 'string' ? website : undefined,
        category: typeof category === 'string' ? category : undefined,
        search: typeof search === 'string' ? search : undefined,
        page: 1,
        limit: 24,
      };

      const products = await this.searchProductsService.searchProducts(searchParams);
      res.status(200).json({ products });
    } catch (error) {
      next(error);
    }
  }
}
