"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { RegisterSchema } from "@/utils/validations/auth";
import * as z from "zod";
import { Loader2, Mail, Lock, User, Phone, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        router.push("/login?registered=true");
      } else {
        const data = await response.text();
        setError(data || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-slate-100 shadow-2xl dark:border-slate-800 dark:bg-slate-950">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 dark:bg-slate-50">
          <Sparkles className="h-6 w-6 text-white dark:text-slate-900" />
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">Create your account</CardTitle>
        <CardDescription className="text-slate-500 dark:text-slate-400">
          Join us to start building your professional portfolio
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-600 dark:bg-red-900/20 dark:text-red-400">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                id="name"
                placeholder="John Doe"
                className="pl-10"
                disabled={isLoading}
                {...register("name")}
              />
            </div>
            {errors.name && (
              <p className="text-xs font-medium text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                id="phone"
                placeholder="+1 234 567 890"
                className="pl-10"
                disabled={isLoading}
                {...register("phone")}
              />
            </div>
            {errors.phone && (
              <p className="text-xs font-medium text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="pl-10"
                disabled={isLoading}
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-xs font-medium text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  className="pl-10"
                  disabled={isLoading}
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <p className="text-xs font-medium text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  className="pl-10"
                  disabled={isLoading}
                  {...register("confirmPassword")}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-xs font-medium text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-indigo-600 font-bold text-white hover:bg-indigo-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-wrap justify-center gap-1 text-center text-sm text-slate-500">
        <span>Already have an account?</span>
        <Button variant="link" size="sm" className="px-0 font-bold text-slate-900 dark:text-slate-50" onClick={() => router.push("/login")}>
          Sign in
        </Button>
      </CardFooter>
    </Card>
  );
};
