import express from "express";
import { shortenUrl, redirectUrl } from "../controller/urlShorter.js";
import { asyncErrorhandler } from "../middlewares/asynErrorandler.js";

const router = express.Router();

router.post("/shorten", asyncErrorhandler(shortenUrl));
router.get("/r/:code", asyncErrorhandler(redirectUrl));

export default router;
