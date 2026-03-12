import mongoose, { Document, Types } from 'mongoose';

interface IOrderItem {
    _id?: Types.ObjectId;
    course: Types.ObjectId;
    price: number;
}

export interface IOrder extends Document {
    user: Types.ObjectId;
    cartItems: IOrderItem[];
    taxPrice: number;
    totalOrderPrice: number;
    paymentMethodType: 'card' | 'cash';
    isPaid: boolean;
    paidAt?: Date;
}

const orderSchema = new mongoose.Schema<IOrder>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Order must belong to a user'],
        },

        cartItems: [
            {
                course: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Course',
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
            },
        ],

        taxPrice: {
            type: Number,
            default: 0,
        },

        totalOrderPrice: {
            type: Number,
            required: true,
        },

        paymentMethodType: {
            type: String,
            enum: ['card', 'cash'],
            default: 'card',
        },

        isPaid: {
            type: Boolean,
            default: false,
        },

        paidAt: Date,
    },
    { timestamps: true }
);

orderSchema.pre(/^find/, function () {
    (this as any).populate({
        path: 'user',
        select: 'name -_id',
    });
});

const Order = mongoose.model<IOrder>('Order', orderSchema);
export default Order;
