import { z } from "zod";

export const changePasswordSchema = z.object({
    oldPassword: z.string(),
    newPassword: z.string(),
    confirmPassword: z.string(),
});

export type TChangePassword = z.infer<typeof changePasswordSchema>;

// ------ For Login

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(2),
});

export type TLogin = z.infer<typeof loginSchema>;

// ------ For Register
export const signUpSchema = z.object({
    firstName: z
        .string()
        .min(1, {
            message: "First Name is required",
        })
        .trim(),

    lastName: z
        .string()
        .min(1, {
            message: "Last Name is required",
        })
        .trim(),
    email: z
        .string({
            required_error: "Email is required",
        })
        .email({
            message: "Please enter a valid email address",
        })
        .trim(),
    password: z
        .string()
        .min(8, { message: "Be at least 8 characters long" })
        .regex(/[a-zA-Z]/, {
            message: "Contain at least one letter.",
        })
        .regex(/[0-9]/, {
            message: "Contain at least one number.",
        })
        .regex(/[^a-zA-Z0-9]/, {
            message: "Contain at least one special character.",
        })
        .trim(),
    phone: z.string().min(1, {
        message: "Phone is required",
    }),
});
export type TSignUp = z.infer<typeof signUpSchema>;


// ------ For Forget Password
export const forgetPasswordSchema = z.object({
    email: z.string().email(),
});

export type TForgetPassword = z.infer<typeof forgetPasswordSchema>;

// ------ For OTP
export const otpSchema = z.object({
    otp: z.string().length(6),
    verificationToken: z.string(),
});

export type TOtp = z.infer<typeof otpSchema>;

// ------ For New Password
export const newPasswordSchema = z
    .object({
        password: z.string().min(6),
        confirmPassword: z.string(),
        token: z.string(),
    })
    .refine(
        (values) => {
            return values.password === values.confirmPassword;
        },
        {
            message: "Passwords must match!",
            path: ["confirmPassword"],
        }
    );

export type TNewPassword = z.infer<typeof newPasswordSchema>;