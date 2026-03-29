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

export default function SecuritySection() {
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
        toast.success("Password updated successfully!");
        reset();
      },
      onError: (error: Error) => {
        const axiosError = error as AxiosError<{ message?: string }>;
        toast.error(axiosError.response?.data?.message || "Failed to update password.");
      },
    });
  };

  return (
    <div className="space-y-8 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 transition-colors">
      <div className="space-y-1">
        <h2 className="text-3xl font-extrabold tracking-tight dark:text-white">Security Settings</h2>
        <p className="text-muted-foreground dark:text-slate-400">Manage your account security and authentication methods.</p>
      </div>

      <Card className="border-2 dark:border-slate-800 shadow-lg dark:shadow-2xl bg-card transition-colors duration-300 overflow-hidden">
        <CardHeader className="pb-4 border-b dark:border-slate-800/50">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-primary/10 dark:bg-primary/20 text-primary transition-colors">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-xl md:text-2xl font-bold dark:text-white">Change Password</CardTitle>
              <CardDescription className="dark:text-slate-400 mt-1">We recommend using a strong password that you don't use elsewhere.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-6 pt-8">
              <UniInput control={control} name="currentPassword" label="Current Password" placeholder="Enter your current password" type="password" className="grid gap-2" />
              <div className="grid gap-6 sm:grid-cols-2">
                <UniInput control={control} name="password" label="New Password" placeholder="Enter your new password" type="password" className="grid gap-2" />
                <UniInput control={control} name="passwordConfirm" label="Confirm New Password" placeholder="Enter your confirm new password" type="password" className="grid gap-2" />
              </div>
            </CardContent>
            <CardFooter className="bg-muted/30 dark:bg-slate-900/40 border-t dark:border-slate-800 px-6 py-6 flex justify-end transition-colors">
              <Button type="submit" disabled={isPending} className="gap-2 px-10 h-12 rounded-xl font-bold uppercase tracking-widest text-xs shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer">
                {isPending ? <Spinner className="w-4 h-4" /> : <ShieldCheck className="w-5 h-5" />}
                Update Password
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
