import { Suspense } from "react";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Category, GetAllCategoriesResponse } from "../adminTypes/adminTypes";
import { getAllCategories } from "../_adminActions/getAllCategories";
import AddCategoryModal from "../_components/AddCategoryModal/AddCategoryModal";

// Skeleton Component
function CategoriesSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-96 bg-slate-100 rounded-xl" />
    </div>
  );
}

// Async Data Fetching Component
async function CategoriesContent() {
  const categoriesRes: GetAllCategoriesResponse = await getAllCategories();
  const categoriesList: Category[] = categoriesRes?.data || [];

  return (
    <Card className="rounded-xl border border-slate-200 shadow-sm overflow-hidden bg-white">
      <CardHeader className="border-b border-slate-100 p-4">
        <CardTitle className="text-lg font-semibold text-slate-800">
          All Categories ({categoriesList.length})
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <Table className="w-full text-left text-sm">
          <TableHeader className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-xs">
            <TableRow className="hover:bg-transparent border-b-slate-200">
              <TableHead className="py-3 px-4 font-semibold text-slate-600 w-16">
                SL
              </TableHead>
              <TableHead className="py-3 px-4 font-semibold text-slate-600">
                Icon
              </TableHead>
              <TableHead className="py-3 px-4 font-semibold text-slate-600">
                Category Name
              </TableHead>
              <TableHead className="py-3 px-4 font-semibold text-slate-600">
                Description
              </TableHead>
              <TableHead className="py-3 px-4 font-semibold text-slate-600">
                Created At
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-slate-100">
            {categoriesList.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-8 text-center text-slate-500"
                >
                  No categories found.
                </TableCell>
              </TableRow>
            ) : (
              categoriesList?.map((category: Category, index: number) => (
                <TableRow
                  key={category.id}
                  className="hover:bg-slate-50 transition border-b-slate-100"
                >
                  {/* Serial Number */}
                  <TableCell className="py-4 px-4 font-semibold text-slate-500">
                    #{String(index + 1).padStart(2, "0")}
                  </TableCell>

                  {/* Icon */}
                  <TableCell className="py-4 px-4">
                    <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                      {category.iconUrl?.startsWith("https") ? (
                        <Image
                          unoptimized
                          src={category?.iconUrl}
                          alt={category.name}
                          width={24}
                          height={24}
                          className="w-6 h-6 object-contain"
                        />
                      ) : (
                        <span className="text-xs font-bold text-slate-400">
                          {category.name.charAt(0)}
                        </span>
                      )}
                    </div>
                  </TableCell>

                  {/* Name */}
                  <TableCell className="py-4 px-4 font-semibold text-slate-800">
                    {category.name}
                  </TableCell>

                  {/* Description */}
                  <TableCell className="py-4 px-4 text-slate-600 max-w-md truncate">
                    {category.description}
                  </TableCell>

                  {/* Created At Date */}
                  <TableCell className="py-4 px-4 text-slate-500 text-xs">
                    {new Date(category.createdAt).toLocaleDateString("en-US", {
                      dateStyle: "medium",
                    })}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

// Main Page Component
export default function CategoriesPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Categories Management
          </h1>
          <p className="text-sm text-slate-500">
            Manage and add service categories for your platform.
          </p>
        </div>

        {/* Add Category Button & Modal */}
        <AddCategoryModal />
      </div>

      {/* Main Content inside Suspense */}
      <Suspense fallback={<CategoriesSkeleton />}>
        <CategoriesContent />
      </Suspense>
    </div>
  );
}
