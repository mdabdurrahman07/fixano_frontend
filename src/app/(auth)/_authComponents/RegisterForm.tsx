"use client";

import React, {
  useActionState,
  useTransition,
  useEffect,
  useState,
} from "react";
import { useForm, type Resolver, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { RegisterInput, registerSchema } from "@/lib/schemas/zod.authSchema";
import { regFormPrevState } from "@/app/types/types";
import { registerAction } from "../_authActions/authAction";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader,
  Toolbox,
  UserRound,
} from "lucide-react";

const initialState: regFormPrevState = {
  success: false,
  statusCode: 0,
  message: "",
};

export function RegisterForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    registerAction,
    initialState,
  );
  const [isTransitioning, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [activeRole, setActiveRole] = useState<"CUSTOMER" | "TECHNICIAN">(
    "CUSTOMER",
  );

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema) as Resolver<RegisterInput>,
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "CUSTOMER",
      phone: "",
      avatarUrl: "",
      bio: "",
      yearsExperience: undefined,
      hourlyRate: undefined,
    },
  });

  // Switch role and update hidden role field dynamically
  const handleRoleSwitch = (role: "CUSTOMER" | "TECHNICIAN") => {
    setActiveRole(role);
    setValue("role", role, { shouldValidate: true });
  };

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message || "Registration Successful");
      if (state.redirectTo) {
        router.replace(state.redirectTo);
      }
    } else {
      toast.error(state.message);
      if (state.errors) {
        Object.entries(state.errors).forEach(([key, messages]) => {
          if (messages?.[0]) {
            setError(key as keyof RegisterInput, {
              type: "server",
              message: messages[0],
            });
          }
        });
      }
    }
  }, [state, setError, router]);

  const onSubmit: SubmitHandler<RegisterInput> = (data) => {
    startTransition(() => {
      formAction(data);
    });
  };

  const isLoading = isPending || isTransitioning;

  return (
    <div>
      {/* Role Selection Tabs */}
      <div className="mb-8">
        <div className="flex p-1 bg-[#eceef0] rounded-xl gap-1">
          <button
            type="button"
            onClick={() => handleRoleSwitch("CUSTOMER")}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              activeRole === "CUSTOMER"
                ? "text-[#006948] border-[#006948] bg-[#006948]/5 shadow-sm"
                : "text-[#545f73] hover:bg-white/50"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              <UserRound />
            </span>
            I am a Customer
          </button>

          <button
            type="button"
            onClick={() => handleRoleSwitch("TECHNICIAN")}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              activeRole === "TECHNICIAN"
                ? "text-[#006948] border-[#006948] bg-[#006948]/5 shadow-sm"
                : "text-[#545f73] hover:bg-white/50"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              <Toolbox />
            </span>
            I am a Technician
          </button>
        </div>
      </div>

      {/* Main Glass Panel */}
      <div className="bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-sm p-8 md:p-10">
        <div className="mb-8">
          <h1 className="text-[32px] font-bold text-[#191c1e] mb-2 leading-tight">
            Create an account
          </h1>
          <p className="text-[#3d4a42] text-base">
            {activeRole === "CUSTOMER"
              ? "Join Fixano to manage your home services efficiently."
              : "Join our network of professional technicians."}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Hidden Readonly Role Field */}
          <input type="hidden" {...register("role")} value={activeRole} />

          {/* Full Name */}
          <div>
            <div className="relative">
              <input
                {...register("name")}
                id="name"
                type="text"
                disabled={isLoading}
                placeholder=" "
                className={`peer block w-full px-4 pt-6 pb-2 bg-[#f2f4f6] border-0 border-b-2 ${
                  errors.name
                    ? "border-red-500"
                    : "border-[#bccac0] focus:border-[#006948]"
                } focus:ring-0 transition-all rounded-t-xl text-[#191c1e] disabled:opacity-50`}
              />
              <label
                htmlFor="name"
                className="absolute left-4 top-4 text-[#3d4a42] text-sm font-semibold pointer-events-none transition-all duration-200 peer-focus:-translate-y-3 peer-focus:scale-85 peer-focus:text-[#006948] peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-[#006948]"
              >
                Full Name
              </label>
            </div>
            {errors.name && (
              <p className="mt-1 text-xs text-red-600 font-medium">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Address */}
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
              <p className="mt-1 text-xs text-red-600 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
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
              <p className="mt-1 text-xs text-red-600 font-medium">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Phone Number (Optional) */}
          <div>
            <div className="relative">
              <input
                {...register("phone")}
                id="phone"
                type="tel"
                disabled={isLoading}
                placeholder=" "
                className="peer block w-full px-4 pt-6 pb-2 bg-[#f2f4f6] border-0 border-b-2 border-[#bccac0] focus:border-[#006948] focus:ring-0 transition-all rounded-t-xl text-[#191c1e] disabled:opacity-50"
              />
              <label
                htmlFor="phone"
                className="absolute left-4 top-4 text-[#3d4a42] text-sm font-semibold pointer-events-none transition-all duration-200 peer-focus:-translate-y-3 peer-focus:scale-85 peer-focus:text-[#006948] peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-[#006948]"
              >
                Phone Number (Optional)
              </label>
            </div>
          </div>

          {/* Avatar URL (Optional) */}
          <div>
            <div className="relative">
              <input
                {...register("avatarUrl")}
                id="avatarUrl"
                type="url"
                disabled={isLoading}
                placeholder=" "
                className={`peer block w-full px-4 pt-6 pb-2 bg-[#f2f4f6] border-0 border-b-2 ${
                  errors.avatarUrl
                    ? "border-red-500"
                    : "border-[#bccac0] focus:border-[#006948]"
                } focus:ring-0 transition-all rounded-t-xl text-[#191c1e] disabled:opacity-50`}
              />
              <label
                htmlFor="avatarUrl"
                className="absolute left-4 top-4 text-[#3d4a42] text-sm font-semibold pointer-events-none transition-all duration-200 peer-focus:-translate-y-3 peer-focus:scale-85 peer-focus:text-[#006948] peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-[#006948]"
              >
                Avatar URL (Optional)
              </label>
            </div>
            {errors.avatarUrl && (
              <p className="mt-1 text-xs text-red-600 font-medium">
                {errors.avatarUrl.message}
              </p>
            )}
          </div>

          {/* Technician Specific Fields */}
          {activeRole === "TECHNICIAN" && (
            <>
              {/* Bio */}
              <div>
                <div className="relative">
                  <textarea
                    {...register("bio")}
                    id="bio"
                    rows={3}
                    disabled={isLoading}
                    placeholder=" "
                    className="peer block w-full px-4 pt-6 pb-2 bg-[#f2f4f6] border-0 border-b-2 border-[#bccac0] focus:border-[#006948] focus:ring-0 transition-all rounded-t-xl text-[#191c1e] disabled:opacity-50 resize-none"
                  />
                  <label
                    htmlFor="bio"
                    className="absolute left-4 top-4 text-[#3d4a42] text-sm font-semibold pointer-events-none transition-all duration-200 peer-focus:-translate-y-3 peer-focus:scale-85 peer-focus:text-[#006948] peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-[#006948]"
                  >
                    Short Bio (Optional)
                  </label>
                </div>
              </div>

              {/* Experience and Hourly Rate Row */}
              <div className="grid grid-cols-2 gap-4">
                {/* Years Experience */}
                <div>
                  <div className="relative">
                    <input
                      {...register("yearsExperience")}
                      id="yearsExperience"
                      type="number"
                      step="1"
                      disabled={isLoading}
                      placeholder=" "
                      className="peer block w-full px-4 pt-6 pb-2 bg-[#f2f4f6] border-0 border-b-2 border-[#bccac0] focus:border-[#006948] focus:ring-0 transition-all rounded-t-xl text-[#191c1e] disabled:opacity-50"
                    />
                    <label
                      htmlFor="yearsExperience"
                      className="absolute left-4 top-4 text-[#3d4a42] text-sm font-semibold pointer-events-none transition-all duration-200 peer-focus:-translate-y-3 peer-focus:scale-85 peer-focus:text-[#006948] peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-[#006948]"
                    >
                      Years Exp.
                    </label>
                  </div>
                  {errors.yearsExperience && (
                    <p className="mt-1 text-xs text-red-600 font-medium">
                      {errors.yearsExperience.message}
                    </p>
                  )}
                </div>

                {/* Hourly Rate */}
                <div>
                  <div className="relative">
                    <input
                      {...register("hourlyRate")}
                      id="hourlyRate"
                      type="number"
                      step="0.01"
                      disabled={isLoading}
                      placeholder=" "
                      className="peer block w-full px-4 pt-6 pb-2 bg-[#f2f4f6] border-0 border-b-2 border-[#bccac0] focus:border-[#006948] focus:ring-0 transition-all rounded-t-xl text-[#191c1e] disabled:opacity-50"
                    />
                    <label
                      htmlFor="hourlyRate"
                      className="absolute left-4 top-4 text-[#3d4a42] text-sm font-semibold pointer-events-none transition-all duration-200 peer-focus:-translate-y-3 peer-focus:scale-85 peer-focus:text-[#006948] peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-[#006948]"
                    >
                      Hourly Rate ($)
                    </label>
                  </div>
                  {errors.hourlyRate && (
                    <p className="mt-1 text-xs text-red-600 font-medium">
                      {errors.hourlyRate.message}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-[#006948] text-white py-4 rounded-xl font-semibold text-sm shadow-sm hover:shadow-lg hover:bg-[#00855d] transition-all duration-300 active:scale-[0.97] flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <span>{isLoading ? "Creating Account..." : "Create Account"}</span>
            <span className="material-symbols-outlined text-[20px]">
              {isLoading ? <Loader className="animate-spin" /> : <ArrowRight />}
            </span>
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[#3d4a42] text-sm">
            Already have an account?
            <a
              href="/login"
              className="text-[#006948] font-bold hover:underline ml-1"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
