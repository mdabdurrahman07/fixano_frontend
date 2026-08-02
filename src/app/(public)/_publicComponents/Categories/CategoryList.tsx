import Image from "next/image";
import Link from "next/link";
import { ApiResponse, Category } from "@/app/types/types";
import { getAllCategories } from "../../_publicAction/getAllCategories";
import { Folder } from "lucide-react";

export default async function CategoryList() {
  const response: ApiResponse<Category[]> = await getAllCategories();
  const categories = response?.data || [];

  if (!categories.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        No categories available at the moment.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
      {categories.map((category) => {
        const isValidImage =
          category.iconUrl &&
          category.iconUrl.startsWith("http") &&
          category.iconUrl !== "https://example.com";

        return (
          <div
            key={category.id}
            className="group relative flex items-center justify-center aspect-square rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-200 hover:shadow-md"
          >
            {isValidImage ? (
              <div className="relative h-full w-full">
                <Image
                  unoptimized
                  src={category.iconUrl}
                  alt={category.name || "Category Image"}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-400 group-hover:text-gray-600 transition-colors">
                <Folder className="h-10 w-10 stroke-[1.5]" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
