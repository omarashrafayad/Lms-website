"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useCart, useCreateOrder, useRemoveFromCart } from "../hooks/useCheckout";
import { getImageUrl } from "@/lib/image.utils";
import { Loader2, Trash2, ShoppingCart } from "lucide-react";

export default function CheckoutPage() {
  const { data: cartData, isLoading } = useCart();
  const createOrderMutation = useCreateOrder();
  const removeMutation = useRemoveFromCart();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const cart = cartData?.data;
  const items = cart?.cartItems || [];

  const handleCheckout = () => {
    if (cart?._id) {
        createOrderMutation.mutate(cart._id);
    }
  };

  if (items.length === 0) {
      return (
          <div className="bg-white min-h-screen py-32 flex flex-col items-center justify-center text-center px-6">
              <div className="h-24 w-24 bg-blue-50 rounded-full flex items-center justify-center text-primary mb-8 shadow-inner">
                  <ShoppingCart size={40} />
              </div>
              <h1 className="text-3xl font-bold text-slate-800 mb-4">Your cart is empty</h1>
              <p className="text-slate-500 max-w-md mb-10 font-medium">Looks like you haven't added any courses yet. Start exploring our world-class curriculum.</p>
              <Link href="/courses">
                  <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl h-14 px-12 font-bold cursor-pointer shadow-lg shadow-primary/20">
                      Browse Courses
                  </Button>
              </Link>
          </div>
      );
  }

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="container mx-auto px-6 lg:px-24 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Checkout Form */}
          <div className="flex-1">
            <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-slate-50 space-y-10">
              <h1 className="text-3xl font-bold text-slate-800">Checkout</h1>
              
              <div className="space-y-4">
                <p className="text-sm font-bold text-slate-400">Payment Method</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
                    "https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg",
                    "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
                    "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                  ].map((logo, i) => (
                    <button key={i} className="h-16 flex items-center justify-center p-4 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer">
                       <img src={logo} alt="payment" className="h-full object-contain" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-slate-700">Name on Card</Label>
                  <Input placeholder="Enter name on Card" className="rounded-xl h-12 border-slate-100 placeholder:text-slate-300" />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-slate-700">Card Number</Label>
                  <Input placeholder="Enter Card Number" className="rounded-xl h-12 border-slate-100 placeholder:text-slate-300" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">Expiration Date ( MM/YY )</Label>
                    <Input placeholder="Enter Expiration Date" className="rounded-xl h-12 border-slate-100 placeholder:text-slate-300" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">CVC</Label>
                    <Input placeholder="Enter CVC" className="rounded-xl h-12 border-slate-100 placeholder:text-slate-300" />
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox id="save-info" className="h-5 w-5 rounded-md border-slate-200" />
                  <label htmlFor="save-info" className="text-sm text-slate-400 font-medium cursor-pointer">
                    Save my information for faster checkout
                  </label>
                </div>
              </div>

              <Button 
                onClick={handleCheckout}
                disabled={createOrderMutation.isPending}
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-14 font-bold text-lg cursor-pointer shadow-lg shadow-primary/20"
              >
                {createOrderMutation.isPending ? <Loader2 className="animate-spin" /> : "Confirm Order"}
              </Button>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:w-[400px]">
            <div className="bg-blue-50/30 rounded-[2.5rem] p-10 space-y-8">
              <h2 className="text-2xl font-bold text-slate-800">Summary</h2>
              
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item._id} className="flex gap-4 group">
                    <div className="h-16 w-20 shrink-0 rounded-xl overflow-hidden shadow-md">
                      <Image 
                        src={getImageUrl(item.course?.imageCover, 'courses')} 
                        alt={item.course?.title || 'course'} 
                        width={80} 
                        height={64} 
                        className="object-cover h-full" 
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-slate-800 leading-tight mb-1 line-clamp-1">{item.course?.title}</h4>
                      <p className="text-[10px] text-slate-400 font-medium line-clamp-1">{item.course?.description}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm font-bold text-slate-700">${item.price}</p>
                        <button 
                            onClick={() => removeMutation.mutate(item._id)}
                            className="text-rose-400 hover:text-rose-600 transition cursor-pointer"
                        >
                            <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-slate-200 space-y-4">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="text-slate-700">${cart?.totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-slate-400">Coupon Discount</span>
                  <span className="text-slate-700">{cart?.totalPriceAfterDiscount ? Math.round(((cart.totalPrice - cart.totalPriceAfterDiscount) / cart.totalPrice) * 100) : 0} %</span>
                </div>
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-slate-400">Processing Fee</span>
                  <span className="text-slate-700">$0.00</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-4 border-t border-slate-100">
                   <span className="text-slate-400">Total</span>
                   <span className="text-slate-800">${cart?.totalPriceAfterDiscount || cart?.totalPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
