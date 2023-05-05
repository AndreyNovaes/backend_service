import express from "express";
import dotenv from "dotenv";
// controllers (dependency injection)
import { categoriesController } from "./dependencyWiring/categories.wiring";
import { websitesController } from "./dependencyWiring/websites.wiring";
import { searchController } from "./dependencyWiring/search.wiring";
// route creators
import { createCategoriesRouter } from "./routes/categories.route";
import { createWebsitesRouter } from "./routes/websites.route";
import { createSearchRouter } from "./routes/search.route";
// cors
import cors from "cors";
// error middleware
import { errorMiddleware } from "./Error/error.middleware";

dotenv.config();

const app = express();

app.use(cors());

app.use("/categories", createCategoriesRouter(categoriesController));
app.use("/websites", createWebsitesRouter(websitesController));
app.use("/search", createSearchRouter(searchController));

app.use(errorMiddleware);

export default app;
