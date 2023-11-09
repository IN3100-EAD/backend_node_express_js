import express from "express";

import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import orderRoutes from "./orderRoutes.js";

const router = express.Router();

export default () => {
  authRoutes(router);
  userRoutes(router);
  orderRoutes(router);
  return router;
};
