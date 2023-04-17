import { Request, Response, NextFunction } from "express";
import { getWebsitesService } from "../services/websites.service";

async function validateWebsiteMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const website = req.query.website as string | undefined;
    const websites = await getWebsitesService();

    // Check if the website exists in the list of websites from /websites endpoint
    if (!website || websites.includes(website)) {
      next();
    } else {
      res.status(400).json({ message: "Invalid website" });
    }
  } catch (error) {
    console.error("Error in validateWebsiteMiddleware:", error);
    next(error);
  }
}

export { validateWebsiteMiddleware };
