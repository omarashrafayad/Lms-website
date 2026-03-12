import mongoose, { Document, Types } from "mongoose";

export interface ICartItem {
    _id?: Types.ObjectId;
    course: Types.ObjectId;
    price: number;
}
export interface ICart extends Document {
    cartItems: ICartItem[];
    totalCartPrice: number;
    totalPriceAfterDiscount?: number | string;
    user: Types.ObjectId;
}
const cartSchema = new mongoose.Schema<ICart>(
    {
        cartItems: [
            {
                course: {
                    type: mongoose.Schema.ObjectId,
                    ref: 'Course',
                },
                price: Number,
            },
        ],
        totalCartPrice: Number,
        totalPriceAfterDiscount: Number,
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

const cartModel = mongoose.model<ICart>('Cart', cartSchema);
export default cartModel;