import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(3, "Too short User name"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone number too short"),
  profileImg: z.any().optional(),
});

export type updateProfileFormData = z.infer<typeof updateProfileSchema>;

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "You must enter your current password"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Password Confirmation incorrect",
  });

export type updatePasswordFormData = z.infer<typeof updatePasswordSchema>;
