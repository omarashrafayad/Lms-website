"use client";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormData, signupSchema } from "@/features/auth/schemas/auth.schema";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { signupAction } from "@/features/auth/api/auth";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { UniInput } from "@/components/shared/UniInput";

export function RegisterForm() {
    const router = useRouter();

    const form = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        mode: "all",
        defaultValues: {
            name: "",
            email: "",
            password: "",
            passwordConfirm: "",
        },
    });

    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
    } = form;

    const onSubmit = async (data: SignupFormData) => {
        try {
            const res = await signupAction(data);
            if (res?.success) {
                toast.success("Account created successfully!");
                router.push("/");
                router.refresh();
            } else {
                toast.error(res?.error || "Registration failed. Please try again.");
            }
        } catch (error) {
            toast.error("An unexpected error occurred. Please try again later.");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <UniInput
                    control={control}
                    name="name"
                    label="User name"
                    placeholder="Enter your user name"
                    required
                />

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

                <UniInput
                    control={control}
                    name="passwordConfirm"
                    label="Confirm Password"
                    placeholder="Confirm your password"
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
                            Creating account...
                        </>
                    ) : (
                        "Create Account"
                    )}
                </Button>
            </form>
        </Form>
    );
}
