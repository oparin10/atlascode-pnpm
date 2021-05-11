import express, { Request, Response, Router } from "express";
import {
  getEntry,
  getEntryByID,
  getEntryWhere,
} from "../../controllers/collections";
const cors = require("cors");

const collectionsRouter: Router = express.Router();

collectionsRouter.options("*", cors());

collectionsRouter.get("/entries/:collectionRef", cors(), getEntry);

collectionsRouter.get("/entries/:collectionRef/:id", cors(), getEntryByID);

collectionsRouter.post("/entries/:collectionRef/where", cors(), getEntryWhere);

export default collectionsRouter;
