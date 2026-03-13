import mongoose, { Document } from "mongoose";

export interface IMembershipPlan extends Document {
    name: string;
    description: string;
    price: number;
    period: "month" | "year" | "forever";
    features: string[];
    isPopular: boolean;
}

const membershipPlanSchema = new mongoose.Schema<IMembershipPlan>({
    name: {
        type: String,
        required: [true, "Plan name is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Plan description is required"]
    },
    price: {
        type: Number,
        required: [true, "Plan price is required"]
    },
    period: {
        type: String,
        enum: ["month", "year", "forever"],
        default: "month"
    },
    features: {
        type: [String],
        default: []
    },
    isPopular: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const MembershipPlanModel = mongoose.model<IMembershipPlan>("MembershipPlan", membershipPlanSchema);
export default MembershipPlanModel;
