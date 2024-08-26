import express from "express"
import { protectRoute } from "../middleware/protectRoute.middleware.js"
import { followUnfollowUser, getUserProfile, getSuggestedUsers } from "../controllers/user.controller.js"

const router = express.Router()

router.get("/profile/:username", protectRoute, getUserProfile)
router.get("/suggested", protectRoute, getSuggestedUsers)
router.post("/follow/:id", protectRoute, followUnfollowUser)
// router.post("/update", protectRoute, )

export default router