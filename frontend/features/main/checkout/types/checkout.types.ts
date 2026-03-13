export interface CartItem {
    _id: string;
    course: any;
    price: number;
}

export interface Cart {
    _id: string;
    cartItems: CartItem[];
    totalPrice: number;
    totalPriceAfterDiscount?: number;
    user: string;
}

export interface CartResponse {
    status: string;
    numOfCartItems: number;
    data: Cart;
}
