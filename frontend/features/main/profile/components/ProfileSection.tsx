"use client";

import { toast } from "sonner";
import { Edit2, Camera } from "lucide-react";
import { User } from "@/features/auth/types/auth.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { AxiosError } from "axios";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { updateProfileFormData, updateProfileSchema } from "../schemas/user.schema";
import { useUpdateProfileFormdata } from "../hooks/useUser";
import { UniInput } from "@/components/shared/UniInput";
import { Form } from "@/components/ui/form";

import { useTranslations } from "next-intl";

export default function ProfileSection({ user }: { user: User }) {
  const t = useTranslations("profile");
  const form = useForm<updateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    mode: "all",
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      profileImg: "",
    },
  });

  const {
    handleSubmit,
    control,
    register,
    formState: { isSubmitting },
  } = form;

  const [preview, setPreview] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      form.reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        profileImg: "",
      });
      setPreview(user.profileImg || null);
    }
  }, [isOpen, user, form]);

  const { setAuth } = useAuthStore();
  const { mutate } = useUpdateProfileFormdata();

  const onSubmit = async (data: updateProfileFormData) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("phone", data.phone);

      if (data.email !== user.email) {
        formData.append("email", data.email);
      }

      if (data.profileImg && data.profileImg.length > 0) {
        formData.append("profileImg", data.profileImg[0]);
      }

      mutate(formData, {
        onSuccess: (res: any) => {
          if (res?.data) {
            setAuth(res.data);
            toast.success(t("successMessage"));
            setIsOpen(false);
          }
        },
        onError: (err: Error) => {
          const axiosError = err as AxiosError<{ message?: string }>;
          toast.error(axiosError.response?.data?.message || t("failedMessage"));
        },
      });
    } catch (error) {
      toast.error((error as string) || t("unexpectedError"));
    }
  };

  return (
    <Card className="border-none shadow-none bg-transparent lg:border lg:bg-card lg:shadow-sm">
      <CardHeader className="px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-xl md:text-2xl font-bold">{t("infoTitle")}</CardTitle>
            <CardDescription className="text-sm">{t("infoDesc")}</CardDescription>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger
              render={
                <Button size="sm" className="w-full sm:w-auto gap-2 bg-primary text-primary-foreground h-11 sm:h-9 rounded-xl shadow-lg shadow-primary/20 cursor-pointer">
                  <Edit2 className="w-4 h-4" />
                  {t("editBtn")}
                </Button>
              }
            />

            <DialogContent className="w-[95vw] sm:max-w-md rounded-[2.5rem] p-0 border-none overflow-hidden max-h-[90vh] flex flex-col outline-none">
              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden">
                  <DialogHeader className="p-6 border-b border-zinc-100 dark:border-zinc-800">
                    <DialogTitle className="text-xl font-bold">{t("editTitle")}</DialogTitle>
                    <DialogDescription>{t("editDesc")}</DialogDescription>
                  </DialogHeader>

                  <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
                    <div className="flex flex-col items-center gap-4">
                      <div className="relative group">
                        <Avatar className="h-24 w-24 border-4 border-zinc-50 dark:border-zinc-900 shadow-xl">
                          <AvatarImage src={preview || user.profileImg || undefined} alt={user.name} className="object-cover" />
                          <AvatarFallback className="text-3xl font-black bg-primary/5 text-primary">
                            {user.name?.slice(0, 1).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <Label htmlFor="profileImg" className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer backdrop-blur-[2px]">
                          <Camera className="text-white w-7 h-7" />
                        </Label>
                        <Input
                          id="profileImg"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          {...register("profileImg", {
                            onChange: (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setPreview(URL.createObjectURL(file));
                              }
                            },
                          })}
                        />
                      </div>
                      <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{t("changePhoto")}</p>
                    </div>

                    <div className="space-y-4">
                      <UniInput control={control} name="name" label={t("formName")} placeholder={t("namePlaceholder")} type="text" required className="space-y-2" />
                      <UniInput control={control} name="email" label={t("formEmail")} placeholder={t("emailPlaceholder")} type="email" required className="space-y-2" />
                      <UniInput control={control} name="phone" label={t("formPhone")} placeholder={t("phonePlaceholder")} type="text" required className="space-y-2" />
                    </div>
                  </div>

                  <DialogFooter className="p-6 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/30">
                    <DialogClose render={<Button type="button" variant="ghost" className="rounded-xl h-12 w-full sm:w-auto font-bold">{t("cancel")}</Button>} />
                    <Button type="submit" disabled={isSubmitting} className="rounded-xl h-12 px-8 w-full sm:w-auto font-black shadow-lg shadow-primary/20 cursor-pointer">
                      {isSubmitting ? t("saving") : t("save")}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent className="px-6 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          <div className="p-4 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 transition-all hover:bg-white dark:hover:bg-zinc-900 hover:shadow-md">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-1">{t("fullName")}</p>
            <p className="text-base md:text-lg font-bold text-zinc-900 dark:text-zinc-100">{user.name}</p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 transition-all hover:bg-white dark:hover:bg-zinc-900 hover:shadow-md">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-1">{t("formEmail")}</p>
            <p className="text-base md:text-lg font-bold text-zinc-900 dark:text-zinc-100 truncate">{user.email}</p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 transition-all hover:bg-white dark:hover:bg-zinc-900 hover:shadow-md">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-1">{t("formPhone")}</p>
            <p className="text-base md:text-lg font-bold text-zinc-900 dark:text-zinc-100">{user.phone || t("notProvided")}</p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 transition-all hover:bg-white dark:hover:bg-zinc-900 hover:shadow-md">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-1">{t("accountStatus")}</p>
            <div className="mt-1">
              <Badge className={cn(
                "rounded-lg px-2.5 py-0.5 text-[10px] font-bold uppercase",
                user.active ? "bg-emerald-500 hover:bg-emerald-600" : "bg-zinc-500 hover:bg-zinc-600"
              )}>
                {user.active ? t("activeStatus") : t("inactiveStatus")}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
