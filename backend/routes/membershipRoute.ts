import express from "express";
import {
    getAllMembershipPlans,
    getMembershipPlan,
    createMembershipPlan,
    updateMembershipPlan,
    deleteMembershipPlan
} from "../controller/membershipController";
import { protect, allowedTo } from "../controller/authController";

const router = express.Router();

router.route("/")
    .get(getAllMembershipPlans)
    .post(protect, allowedTo("admin"), createMembershipPlan);

router.route("/:id")
    .get(getMembershipPlan)
    .patch(protect, allowedTo("admin"), updateMembershipPlan)
    .delete(protect, allowedTo("admin"), deleteMembershipPlan);

export default router;
