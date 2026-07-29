"use client";

import React, {
  useActionState,
  useTransition,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { loginFormPrevState } from "@/app/types/types";
import { LoginAction } from "../_authActions/authAction";
import { loginInput, loginSchema } from "@/lib/schemas/zod.authSchema";
import { ArrowRight, Eye, EyeOff, Loader } from "lucide-react";

const initialState: loginFormPrevState = {
  success: false,
  message: "",
};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    LoginAction,
    initialState,
  );
  const [isTransitioning, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<loginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });


  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);

      if (state.errors) {
        Object.entries(state.errors).forEach(([key, messages]) => {
          if (messages?.[0]) {
            setError(key as keyof loginInput, {
              type: "server",
              message: messages[0],
            });
          }
        });
      }
    }
  }, [state, setError]);

  const onSubmit = (data: loginInput) => {
    startTransition(() => {
      formAction(data);
    });
  };

  const isLoading = isPending || isTransitioning;

  return (
    <div className="bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-sm p-8 md:p-10">
      <div className="mb-8">
        <h1 className="text-[32px] font-bold text-[#191c1e] mb-2 leading-tight">
          Welcome back
        </h1>
        <p className="text-[#3d4a42] text-base">
          Sign in to access your account dashboard.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email Field */}
        <div>
          <div className="relative">
            <input
              {...register("email")}
              id="email"
              type="email"
              disabled={isLoading}
              placeholder=" "
              className={`peer block w-full px-4 pt-6 pb-2 bg-[#f2f4f6] border-0 border-b-2 ${
                errors.email
                  ? "border-red-500"
                  : "border-[#bccac0] focus:border-[#006948]"
              } focus:ring-0 transition-all rounded-t-xl text-[#191c1e] disabled:opacity-50`}
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-4 text-[#3d4a42] text-sm font-semibold pointer-events-none transition-all duration-200 peer-focus:-translate-y-3 peer-focus:scale-85 peer-focus:text-[#006948] peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-[#006948]"
            >
              Email Address
            </label>
          </div>
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-600 font-medium">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <div className="relative">
            <input
              {...register("password")}
              id="password"
              type={showPassword ? "text" : "password"}
              disabled={isLoading}
              placeholder=" "
              className={`peer block w-full px-4 pt-6 pb-2 bg-[#f2f4f6] border-0 border-b-2 ${
                errors.password
                  ? "border-red-500"
                  : "border-[#bccac0] focus:border-[#006948]"
              } focus:ring-0 transition-all rounded-t-xl text-[#191c1e] disabled:opacity-50`}
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-4 text-[#3d4a42] text-sm font-semibold pointer-events-none transition-all duration-200 peer-focus:-translate-y-3 peer-focus:scale-85 peer-focus:text-[#006948] peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-[#006948]"
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-5 text-[#3d4a42] hover:text-[#006948] transition-colors"
            >
              <span className="material-symbols-outlined">
                {showPassword ? <Eye /> : <EyeOff />}
              </span>
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-xs text-red-600 font-medium">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#006948] text-white py-4 rounded-xl font-semibold text-sm shadow-sm hover:shadow-lg hover:bg-[#00855d] transition-all duration-300 active:scale-[0.97] flex items-center justify-center gap-2 disabled:opacity-60"
        >
          <span>{isLoading ? "Logging in..." : "Log in"}</span>
          <span className="material-symbols-outlined text-[20px]">
            {isLoading ? <Loader className="animate-spin" /> : <ArrowRight />}
          </span>
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-[#3d4a42] text-sm">
          Don&apos;t have an account?
          <a
            href="/register"
            className="text-[#006948] font-bold hover:underline ml-1"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
