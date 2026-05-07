import { RegisterForm } from "@/components/forms/register-form";

export default function RegisterPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white dark:bg-slate-950">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 -z-10 h-[40%] w-[70%] -translate-x-1/2 rounded-full bg-blue-50 blur-[120px] dark:bg-blue-900/10" />
      
      <div className="z-10 flex w-full flex-col items-center px-4">
        <RegisterForm />
        
        <p className="mt-8 text-center text-xs text-slate-400 dark:text-slate-600">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </main>
  );
}
