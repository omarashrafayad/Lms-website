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
    .post(createMembershipPlan);

router.route("/:id")
    .get(getMembershipPlan)
    .patch(updateMembershipPlan)
    .delete(deleteMembershipPlan);
export default router;
