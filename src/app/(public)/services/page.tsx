import { Suspense } from "react";
import { getAllServices } from "../_publicAction/getAllServices";
import { ServicesControls } from "../_publicComponents/service-controls";
import { ServicesGrid } from "../_publicComponents/service-grid";



interface ServicesPageProps {
  searchParams: Promise<{
    searchTerm?: string;
    sortby?: string;
    sortOrder?: "asc" | "desc";
    categoryId?: string;
    technicianId?: string;
    isActive?: string;
  }>;
}

async function ServicesContent({
  searchParams,
}: ServicesPageProps) {
  const params = await searchParams;

  const serviceQuery = {
    searchTerm: params.searchTerm,

    sortby:
      params.sortby === "title" ||
      params.sortby === "price" ||
      params.sortby === "createdAt"
        ? params.sortby
        : "createdAt",

    sortOrder:
      params.sortOrder === "asc"
        ? "asc"
        : "desc",

    categoryId: params.categoryId,

    technicianId: params.technicianId,

    isActive:
      params.isActive === undefined
        ? undefined
        : params.isActive === "true",
  } as const;

  const result = await getAllServices(serviceQuery);

  const services = result.data;

  /*
   * Get all categories from the complete service list.
   *
   * This is temporary.
   * A dedicated /categories endpoint would be cleaner later.
   */
  const allServicesResult = await getAllServices({
    sortby: "createdAt",
    sortOrder: "desc",
  });

  const categories = Array.from(
    new Map(
      allServicesResult.data.map((service) => [
        service.category.id,
        {
          id: service.category.id,
          name: service.category.name,
        },
      ]),
    ).values(),
  ).sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  return (
    <>
      <ServicesControls categories={categories} />

      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {services.length}
              </span>{" "}
              {services.length === 1
                ? "service"
                : "services"}
            </p>
          </div>

          <ServicesGrid services={services} />
        </div>
      </div>
    </>
  );
}

function ServicesSkeleton() {
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="h-6 w-32 rounded-md bg-muted animate-pulse mb-6" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-80 rounded-2xl bg-muted animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage({
  searchParams,
}: ServicesPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/50 backdrop-blur">
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2">
              Services Catalog
            </h1>

            <p className="text-muted-foreground max-w-2xl">
              Browse our comprehensive collection
              of professional services. Search,
              filter by category, and sort by your
              preference.
            </p>
          </div>
        </div>
      </div>

      <Suspense fallback={<ServicesSkeleton />}>
        <ServicesContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}