import MembershipPlan from "../model/membershipModel";
import * as factory from "./handleFactory";

export const getAllMembershipPlans = factory.getAll(MembershipPlan);
export const getMembershipPlan = factory.getOne(MembershipPlan);
export const createMembershipPlan = factory.createOne(MembershipPlan);
export const updateMembershipPlan = factory.updateOne(MembershipPlan);
export const deleteMembershipPlan = factory.deleteOne(MembershipPlan);
