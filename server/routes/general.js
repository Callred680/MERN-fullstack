import express from "express";
import {getUser} from "../controllers/general.js";

const router = express.Router();

router.get("/user/:id", getUser)    // Calls the end point (in MongoDB) "/user/:id" for retrieving data based on given id

export default router;