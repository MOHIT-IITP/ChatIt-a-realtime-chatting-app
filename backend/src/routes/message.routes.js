import express from "express";
import {
  getMessages,
  getUserForSidebar,
  handleDeleteMessage,
  handleEditMessage,
  handleReaction,
  sendMessages,
} from "../controller/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.get("/users", protectRoute, getUserForSidebar);
router.get("/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessages);
router.post("/delete/:id", protectRoute, handleDeleteMessage);
router.put("/edit/:id", protectRoute, handleEditMessage);
router.put("/reaction/:id", protectRoute, handleReaction);

export default router;
