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
import { useTranslations } from "next-intl";

export function RegisterForm() {
    const t = useTranslations("auth");
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
                toast.success(t("registerSuccess"));
                router.push("/");
                router.refresh();
            } else {
                toast.error(res?.error || t("registerFailed"));
            }
        } catch (error) {
            toast.error(t("unexpectedError"));
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <UniInput
                    control={control}
                    name="name"
                    label={t("userName")}
                    placeholder={t("userNamePlaceholder")}
                    required
                />

                <UniInput
                    control={control}
                    name="email"
                    label={t("email")}
                    placeholder={t("emailPlaceholder")}
                    type="email"
                    required
                />

                <UniInput
                    control={control}
                    name="password"
                    label={t("password")}
                    placeholder={t("passwordPlaceholder")}
                    type="password"
                    required
                />

                <UniInput
                    control={control}
                    name="passwordConfirm"
                    label={t("confirmPassword")}
                    placeholder={t("confirmPasswordPlaceholder")}
                    type="password"
                    required
                />

                <Button
                    type="submit"
                    className="h-12 w-full rounded-full bg-primary text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl active:scale-[0.98] rtl:flex-row-reverse"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 rtl:ml-2 rtl:mr-0 h-5 w-5 animate-spin" />
                            {t("creatingAccount")}
                        </>
                    ) : (
                        t("register")
                    )}
                </Button>
            </form>
        </Form>
    );
}
