import express from "express";
import {
  addVideo,
  addViews,
  deleteVideo,
  getVideo,
  random,
  subs,
  trends,
  updateVideo,
} from "../controllers/video.controller.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addVideo);
router.put("/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken, deleteVideo);
router.get("/find/:id", getVideo);
router.put("/view/:id", addViews);
router.get("/trend", trends);
router.get("/random", random);
router.get("/sub", verifyToken, subs);

export default router;
