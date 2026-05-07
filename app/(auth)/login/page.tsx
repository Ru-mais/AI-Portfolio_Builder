import { LoginForm } from "@/components/forms/login-form";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Background Orbs/Glows */}
      <div className="absolute left-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full bg-blue-400/20 blur-[120px] dark:bg-blue-600/10" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-purple-400/20 blur-[120px] dark:bg-purple-600/10" />
      
      <div className="z-10 flex w-full flex-col items-center px-4">
        {/* Logo/Brand Section */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 shadow-xl ring-1 ring-slate-900/10 dark:bg-slate-50">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-white dark:text-slate-900"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
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
