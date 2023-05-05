import { NextFunction, Request, Response } from "express";
import { WebsitesService } from "../services/websites.service";

export class WebsitesController {
  constructor(private websitesService: WebsitesService) {}

  getWebsites = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const websites = await this.websitesService.getWebsites();
      res.status(200).json({ websites });
    } catch (error) {
      next(error);
    }
  }
}


