import express from "express";
import { getProducts, getCustomers, getTransactions, getGeography } from "../controllers/client.js";

const router = express.Router();

router.get("/products", getProducts);   // Calls the end point (in MongoDB) "/products" for retrieving data
router.get("/customers", getCustomers);  // Calls the end point (in MongoDB) "/users" for retrieving data
router.get("/transactions", getTransactions);   // Calls the end point (in MongoDB) "/transactions" for retrieving data
router.get("/geography", getGeography)  // Calls the end point (in MongoDB) "/users" for retrieving data
export default router;