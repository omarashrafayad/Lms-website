import { z } from "zod";

export const signupSchema = z
    .object({
        name: z.string().min(3, 'Too short user name'),
        email: z.string().email('Invalid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        passwordConfirm: z.string().min(6, 'Password confirmation must be at least 6 characters'),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: "Passwords do not match",
        path: ["passwordConfirm"],
    });

export const loginSchema = z
    .object({
        email: z.string().email('Invalid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
    });

export const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
});

export const resetCodeSchema = z.object({
    resetCode: z.string().min(6, 'Reset code must be at least 6 characters')
});

export const resetPasswordSchema = z.object({
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    email: z.string().email('Invalid email address')
});

export type SignupFormData = z.infer<typeof signupSchema>;
export type loginFormData = z.infer<typeof loginSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type VerifyResetCodeFormData = z.infer<typeof resetCodeSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
