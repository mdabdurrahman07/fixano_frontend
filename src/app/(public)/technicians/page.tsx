import { Suspense } from "react";
import { getAllTechnicians } from "../_publicAction/getAllTechnicians";
import { TechnicianControls } from "../_publicComponents/_technicianComponents/technician-controllers";
import { TechniciansGrid } from "../_publicComponents/_technicianComponents/technician-grid";



interface TechniciansPageProps {
  searchParams: Promise<{
    searchTerm?: string;
    sortby?: string;
    sortOrder?: "asc" | "desc";
    isVerified?: string;
  }>;
}

async function TechniciansContent({
  searchParams,
}: TechniciansPageProps) {
  const params = await searchParams;

  const technicianQuery = {
    searchTerm: params.searchTerm,

    sortby:
      params.sortby === "avgRating" ||
      params.sortby === "yearsExperience" ||
      params.sortby === "hourlyRate" ||
      params.sortby === "createdAt"
        ? params.sortby
        : "createdAt",

    sortOrder:
      params.sortOrder === "asc"
        ? "asc"
        : "desc",

    isVerified:
      params.isVerified === undefined
        ? undefined
        : params.isVerified === "true",
  } as const;

  const result = await getAllTechnicians(
    technicianQuery,
  );

  const technicians = result.data;

  return (
    <>
      <TechnicianControls />

      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {technicians.length}
              </span>{" "}
              {technicians.length === 1
                ? "technician"
                : "technicians"}
            </p>
          </div>

          <TechniciansGrid
            technicians={technicians}
          />
        </div>
      </div>
    </>
  );
}

function TechniciansSkeleton() {
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="h-6 w-40 rounded-md bg-muted animate-pulse mb-6" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map(
            (_, index) => (
              <div
                key={index}
                className="h-80 rounded-2xl bg-muted animate-pulse"
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
}

export default function PublicTechniciansPage({
  searchParams,
}: TechniciansPageProps) {
  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <div className="border-b border-border bg-background/50 backdrop-blur">
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2">
              Our Technicians
            </h1>

            <p className="text-muted-foreground max-w-2xl">
              Find skilled and verified professionals
              for your home service needs.
            </p>
          </div>
        </div>
      </div>

      <Suspense fallback={<TechniciansSkeleton />}>
        <TechniciansContent
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  );
}