import { Suspense } from "react";
import CategoryList from "../_publicComponents/Categories/CategoryList";
import Badge from "@/components/shared/Badge";
import { ListSortAscending } from "lucide-react";

function CategorySkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="aspect-square animate-pulse rounded-2xl bg-gray-100"
        />
      ))}
    </div>
  );
}

export default function CategoriesSection() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <section className="space-y-6">
        <div className="flex items-center justify-center">
          <Badge text="All Categories" icon={ListSortAscending} />
        </div>

        <Suspense fallback={<CategorySkeleton />}>
          <CategoryList />
        </Suspense>
      </section>
    </main>
  );
}
