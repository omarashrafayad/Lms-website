import { z } from "zod";

export const userFormSchema = z
    .object({
        name: z.string().min(3, "Too short user name"),
        email: z.string().email("Invalid email address"),
        phone: z.string().optional(),
        role: z.enum(["student", "instructor", "manager", "admin"]),
        password: z.string().optional(),
        passwordConfirm: z.string().optional(),
    })
    .refine(
        (data) => {
            if (data.password && data.password !== data.passwordConfirm) {
                return false;
            }
            return true;
        },
        {
            message: "Passwords do not match",
            path: ["passwordConfirm"],
        }
    );

export type UserFormData = z.infer<typeof userFormSchema>;
