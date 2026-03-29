"use client";

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
import { useTranslations } from "next-intl";

export function LoginForm() {
    const t = useTranslations("auth");
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
                toast.success(t("loginSuccess"));
                router.push("/");
                router.refresh();
            } else {
                toast.error(res?.error || t("loginFailed"));
            }
        } catch (error) {
            toast.error(t("unexpectedError"));
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

                <Button
                    type="submit"
                    className="h-12 w-full rounded-full bg-primary text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl active:scale-[0.98] rtl:flex-row-reverse"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 rtl:ml-2 rtl:mr-0 h-5 w-5 animate-spin" />
                            {t("loggingIn")}
                        </>
                    ) : (
                        t("login")
                    )}
                </Button>
            </form>
        </Form>
    );
}
