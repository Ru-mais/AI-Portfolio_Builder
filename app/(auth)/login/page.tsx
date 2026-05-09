import { LoginForm } from "@/components/forms/login-form";
import { Logo } from "@/components/ui/logo";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Background Orbs/Glows */}
      <div className="absolute left-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full bg-blue-400/20 blur-[120px] dark:bg-blue-600/10" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-purple-400/20 blur-[120px] dark:bg-purple-600/10" />
      
      <div className="z-10 flex w-full flex-col items-center px-4">
        {/* Logo/Brand Section */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <Logo className="h-16 w-16" />
          <h1 className="text-2xl font-black uppercase tracking-tighter text-slate-900 dark:text-slate-50">
            Legacy
          </h1>
        </div>

        <LoginForm />

        <p className="mt-8 text-center text-xs text-slate-400 dark:text-slate-600">
          © 2026 Legacy. All rights reserved.
        </p>
      </div>
    </main>
  );
}
