// "use client";
// import { loginInput, loginSchema } from "@/lib/schemas/zod.authSchema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import React, { useActionState, useEffect, useTransition } from "react";
// import { useForm } from "react-hook-form";
// import { LoginAction } from "../_authActions/authAction";
// import { toast } from "sonner";

// const LoginForm = () => {
//   const formInitialState = {
//     success: false,
//     message: "",
//   };
//   const [state, formAction, isPending] = useActionState(
//     LoginAction,
//     formInitialState,
//   );
//   const [isTransitioning, startTransition] = useTransition();
//   const {
//     register,
//     handleSubmit,
//     setError,
//     formState: { errors },
//   } = useForm<loginInput>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   // toast
//   useEffect(() => {
//     if (!state.message) return;

//     if (state.success) {
//       toast.success(state.message);
//       // redirect
//     } else {
//       toast.error(state.message);
//     }
//   }, [state, setError]);

//   //   form submit

//   const onSubmit = (data: loginInput) => {
//     startTransition(() => {
//       const formData = new FormData();
//       formData.append("email", data.email);
//       formData.append("password", data.password);
//       formAction(formData);
//     });
//   };

//   const isLoading = isPending || isTransitioning;

//   return (
//     <div className="login-box max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-100">
//       <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
//         Login
//       </h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div className="user-box">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Email
//           </label>
//           <input
//             {...register("email")}
//             type="text"
//             disabled={isLoading}
//             className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//               errors.email ? "border-red-500" : "border-gray-300"
//             }`}
//           />
//           {errors.email && (
//             <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
//           )}
//         </div>

//         <div className="user-box">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Password
//           </label>
//           <input
//             {...register("password")}
//             type="password"
//             disabled={isLoading}
//             className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//               errors.password ? "border-red-500" : "border-gray-300"
//             }`}
//           />
//           {errors.password && (
//             <p className="mt-1 text-xs text-red-500">
//               {errors.password.message}
//             </p>
//           )}
//         </div>

//         <button
//           type="submit"
//           disabled={isLoading}
//           className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//         >
//           {isLoading ? "Submitting..." : "Submit"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;
