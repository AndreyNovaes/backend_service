import { Request, Response, NextFunction } from "express";
import { getCategoriesService } from "../services/categories.service";

async function validateCategoryMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const category = req.query.category as string | undefined;
    const categories = await getCategoriesService();

    // Check if the category exists in the list of categories from /categories endpoint
    if (!category || categories.includes(category)) {
      next();
    } else {
      res.status(400).json({ message: "Invalid category" });
    }
  } catch (error) {
    console.error("Error in validateCategoryMiddleware:", error);
    next(error);
  }
}

export { validateCategoryMiddleware };
