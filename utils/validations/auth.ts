import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Full name is required",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits",
  }).regex(/^\+?[0-9]+$/, {
    message: "Invalid phone number format",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  username: z.string().min(3, {
    message: "Username must be at least 3 characters",
  }).optional(), // Keeping it optional in case it's generated later
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  confirmPassword: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
