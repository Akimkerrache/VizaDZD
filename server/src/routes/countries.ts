import { Router } from "express";
import { countries } from "../data/countries.js";

const router = Router();
router.get("/", (_request, response) => response.json(countries));
export default router;
