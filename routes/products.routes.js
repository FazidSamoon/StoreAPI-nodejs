import Express from "express";
const router = Express.Router()

import { getAllproducts , getAllproductsStatic } from "../controllers/products.js";

router.get("/",getAllproducts)
router.get("/static" , getAllproductsStatic)


export default router