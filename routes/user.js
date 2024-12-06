import express from 'express';
import {login,signup} from "../Controller/auth.js"

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);





export default router;