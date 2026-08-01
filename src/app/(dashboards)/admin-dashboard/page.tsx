import { Suspense } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllUsers } from "./_adminActions/getAllUsers";
import { getAllBookings } from "./_adminActions/getAllBookings";
import { getAllCategories } from "./_adminActions/getAllCategories";
import StatCards from "./_components/StatsCard/StatsCard";
import { User } from "./adminTypes/adminTypes";
import UserActionButton from "./_components/UserActionButton/UserActionButton";


// Skeleton Loading Component for Suspense
function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Stat Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-slate-100 rounded-xl" />
        ))}
      </div>
      {/* Table Skeleton */}
      <div className="h-96 bg-slate-100 rounded-xl" />
    </div>
  );
}

// Async Data Component
async function DashboardContent() {
  const [users, bookings, categories] = await Promise.all([
    getAllUsers(),
    getAllBookings(),
    getAllCategories(),
  ]);

  const userList: User[] = users?.data || [];

  return (
    <>
      {/* Top Section - 4 Stat Cards */}
      <StatCards users={users} bookings={bookings} categories={categories} />

      {/* Middle Section - User Management Table */}
      <Card className="rounded-xl border border-slate-200 shadow-sm overflow-hidden bg-white">
        <CardHeader className="border-b border-slate-100 p-4">
          <CardTitle className="text-lg font-semibold text-slate-800">
            User Management
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table className="w-full text-left text-sm">
            <TableHeader className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-xs">
              <TableRow className="hover:bg-transparent border-b-slate-200">
                <TableHead className="py-3 px-4 font-semibold text-slate-600">
                  User
                </TableHead>
                <TableHead className="py-3 px-4 font-semibold text-slate-600">
                  Role
                </TableHead>
                <TableHead className="py-3 px-4 font-semibold text-slate-600">
                  Joined
                </TableHead>
                <TableHead className="py-3 px-4 font-semibold text-slate-600">
                  Status
                </TableHead>
                <TableHead className="py-3 px-4 font-semibold text-slate-600 text-center">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-slate-100">
              {userList.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-8 text-center text-slate-500"
                  >
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                userList.map((user: User) => {
                  const isBanned = user.status === "BANNED";

                  return (
                    <TableRow
                      key={user.id}
                      className="hover:bg-slate-50 transition border-b-slate-100"
                    >
                      {/* User Info */}
                      <TableCell className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <Image
                            unoptimized
                            src={user.avatarUrl || "/avatar-placeholder.png"}
                            alt={user.name || "User Avatar"}
                            width={36}
                            height={36}
                            className="w-9 h-9 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <p className="font-semibold text-slate-800">
                              {user.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Role */}
                      <TableCell className="py-4 px-4 font-medium text-slate-700">
                        <span className="px-2.5 py-1 text-xs rounded-full font-medium bg-slate-100 text-slate-700">
                          {user.role}
                        </span>
                      </TableCell>

                      {/* Joined Date */}
                      <TableCell className="py-4 px-4 text-slate-600">
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          dateStyle: "medium",
                        })}
                      </TableCell>

                      {/* Status */}
                      <TableCell className="py-4 px-4">
                        <span
                          className={`inline-block px-2.5 py-1 text-xs rounded-full font-semibold ${
                            isBanned
                              ? "bg-rose-100 text-rose-700"
                              : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          {user.status}
                        </span>
                      </TableCell>

                      {/* Action */}
                      <TableCell className="py-4 px-4 text-center">
                        <UserActionButton
                          userId={user.id}
                          currentStatus={user.status}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

// Main Page Component wrapped with Suspense
export default function AdminDashboardPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Admin Dashboard
        </h1>
        <p className="text-sm text-slate-500">
          Overview of platform activities and user administration.
        </p>
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </div>
  );
}