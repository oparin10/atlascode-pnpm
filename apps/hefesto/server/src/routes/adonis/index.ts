import express, { Request, Response, Router } from "express";
import { optimizeAndCreateThumbnail } from "../../controllers/adonis";
const cors = require("cors");

const adonisRouter: Router = express.Router();

adonisRouter.options("*", cors());

adonisRouter.get("/", cors(), (req: Request, res: Response) => {
  return res.send("All systems go").status(200);
});

adonisRouter.post("/optimize", cors(), optimizeAndCreateThumbnail);

export default adonisRouter;
