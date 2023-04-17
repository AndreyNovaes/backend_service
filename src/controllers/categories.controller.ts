import { Request, Response, NextFunction } from "express";
import { getCategoriesService } from "../services/categories.service";

export async function getCategoriesController(req: Request, res: Response, next: NextFunction) {
  try {
    const categories = await getCategoriesService();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
}
