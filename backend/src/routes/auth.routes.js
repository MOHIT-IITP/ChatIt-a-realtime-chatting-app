import express from "express";
import {
  checkAuth,
  Login,
  Logout,
  Signup,
  updateProfile,
} from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", Logout);

// create a function to update the profile
// protect route is if they are authenticated then only then can change the profile
router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth);

export default router;
