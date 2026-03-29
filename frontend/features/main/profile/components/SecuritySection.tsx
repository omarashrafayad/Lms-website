"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { updatePasswordSchema, updatePasswordFormData } from "../schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdatePasswordFormdata } from "../hooks/useUser";
import { Lock, ShieldCheck } from "lucide-react";
import { AxiosError } from "axios";
import { Spinner } from "@/components/ui/spinner";
import { UniInput } from "@/components/shared/UniInput";
import { Form } from "@/components/ui/form";

import { useTranslations } from "next-intl";

export default function SecuritySection() {
  const t = useTranslations("profile");
  const { mutate: updatePassword, isPending } = useUpdatePasswordFormdata();
  const form = useForm<updatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
    mode: "all",
    defaultValues: {
      currentPassword: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const { handleSubmit, control, reset } = form;

  const onSubmit = (data: updatePasswordFormData) => {
    updatePassword(data, {
      onSuccess: () => {
        toast.success(t("passwordSuccess"));
        reset();
      },
      onError: (error: Error) => {
        const axiosError = error as AxiosError<{ message?: string }>;
        toast.error(axiosError.response?.data?.message || t("passwordError"));
      },
    });
  };

  return (
    <div className="space-y-8 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 transition-colors">
      <div className="space-y-1">
        <h2 className="text-3xl font-extrabold tracking-tight dark:text-white">{t("securityTitle")}</h2>
        <p className="text-muted-foreground dark:text-slate-400">{t("securityDesc")}</p>
      </div>

      <Card className="border-2 dark:border-slate-800 shadow-lg dark:shadow-2xl bg-card transition-colors duration-300 overflow-hidden">
        <CardHeader className="pb-4 border-b dark:border-slate-800/50">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-primary/10 dark:bg-primary/20 text-primary transition-colors">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-xl md:text-2xl font-bold dark:text-white">{t("changePasswordTitle")}</CardTitle>
              <CardDescription className="dark:text-slate-400 mt-1">{t("changePasswordDesc")}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-6 pt-8">
              <UniInput control={control} name="currentPassword" label={t("currentPasswordLabel")} placeholder={t("currentPasswordPlaceholder")} type="password" className="grid gap-2" />
              <div className="grid gap-6 sm:grid-cols-2">
                <UniInput control={control} name="password" label={t("newPasswordLabel")} placeholder={t("newPasswordPlaceholder")} type="password" className="grid gap-2" />
                <UniInput control={control} name="passwordConfirm" label={t("confirmPasswordLabel")} placeholder={t("confirmPasswordPlaceholder")} type="password" className="grid gap-2" />
              </div>
            </CardContent>
            <CardFooter className="bg-muted/30 dark:bg-slate-900/40 dark:border-slate-800 px-6 py-6 flex justify-end transition-colors">
              <Button type="submit" disabled={isPending} className="gap-2 px-10 h-12 rounded-xl font-bold uppercase tracking-widest text-xs shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer">
                {isPending ? <Spinner className="w-4 h-4" /> : <ShieldCheck className="w-5 h-5" />}
                {t("updatePasswordBtn")}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
