"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormData, loginSchema } from "@/features/auth/schemas/auth.schema";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { loginAction } from "@/features/auth/api/auth";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { UniInput } from "@/components/shared/UniInput";

export function LoginForm() {
    const router = useRouter();

    const form = useForm<loginFormData>({
        resolver: zodResolver(loginSchema),
        mode: "all",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
    } = form;

    const onSubmit = async (data: loginFormData) => {
        try {
            const res = await loginAction(data);
            if (res?.success) {
                toast.success("Login successful!");
                router.push("/");
                router.refresh();
            } else {
                toast.error(res?.error || "Login failed. Please try again.");
            }
        } catch (error) {
            toast.error("An unexpected error occurred. Please try again later.");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <UniInput
                    control={control}
                    name="email"
                    label="Email Address"
                    placeholder="Enter your email"
                    type="email"
                    required
                />

                <UniInput
                    control={control}
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    required
                />

                <Button
                    type="submit"
                    className="h-12 w-full rounded-full bg-primary text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl active:scale-[0.98]"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Logging in...
                        </>
                    ) : (
                        "Login"
                    )}
                </Button>
            </form>
        </Form>
    );
}
