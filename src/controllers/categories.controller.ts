import { Request, Response, NextFunction } from "express";
import { ICategoryService } from "../interfaces/ICategories";

export class CategoriesController {
  constructor(private categoryService: ICategoryService) {}

  getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await this.categoryService.getCategories();
      res.status(200).json({ categories });
    } catch (error) {
      next(error);
    }
  }
}
