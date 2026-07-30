import { Skeleton } from "@/components/ui/skeleton";

export function ServiceCardSkeleton() {
  return (
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <div 
          key={index} 
          className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs"
        >
          {/* Image / Category Area */}
          <div className="relative h-48 w-full bg-slate-100">
            {/* Category Badge */}
            <div className="absolute top-3 left-3">
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            {/* Rating Badge */}
            <div className="absolute top-3 right-3">
              <Skeleton className="h-6 w-12 rounded-lg" />
            </div>
          </div>

          {/* Content */}
          <div className="p-5 space-y-4">
            {/* Title and Description */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-5/6 rounded" />
              <div className="space-y-1">
                <Skeleton className="h-3 w-full rounded" />
                <Skeleton className="h-3 w-2/3 rounded" />
              </div>
            </div>

            {/* Technician / Duration */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div className="space-y-1">
                <Skeleton className="h-3.5 w-20 rounded" />
                <Skeleton className="h-3 w-16 rounded" />
              </div>
              <Skeleton className="h-6 w-14 rounded" />
            </div>

            {/* Book Button */}
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}