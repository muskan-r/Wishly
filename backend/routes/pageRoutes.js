import express from "express";
import { createPage,getPage} from "../controllers/pageController.js";

const router = express.Router();

/*
  POST /api/pages
  Create a new birthday page
*/
router.post("/", createPage);

/*
    GET /api/pages/:slug
    Get a birthday page by slug
*/
router.get("/:slug", getPage);

export default router;