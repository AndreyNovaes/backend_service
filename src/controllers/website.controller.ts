import { Request, Response, NextFunction } from "express";
import { getWebsitesService } from "../services/websites.service";

export async function getWebsitesController(req: Request, res: Response, next: NextFunction) {
  try {
    const websites = await getWebsitesService();
    res.status(200).json(websites);
  } catch (error) {
    next(error);
  }
}
