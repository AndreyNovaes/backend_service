import express from "express";
import dotenv from "dotenv";
// routes
import { categoriesRouter } from "./router/categories.route";
import { websitesRouter } from "./router/website.route";
import { searchRouter } from "./router/search.route";
// validation middleware
import cors from "cors";
import { validateCategoryMiddleware } from "./middlewares/category.validation";
// error middleware
import { errorMiddleware } from "./Error/error.middleware";
import { validateWebsiteMiddleware } from "./middlewares/website.validation";

dotenv.config();

const app = express();

app.use(cors());
app.use("/search", validateCategoryMiddleware, validateWebsiteMiddleware, searchRouter);
app.use("/categories", categoriesRouter);
app.use("/websites", websitesRouter);
app.use(errorMiddleware);

export default app;
