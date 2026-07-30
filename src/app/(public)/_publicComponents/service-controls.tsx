"use client";

import { useEffect, useRef, useState } from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";

import {
  Search,
  X,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface ServicesControlsProps {
  categories: Category[];
}

export function ServicesControls({
  categories,
}: ServicesControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSearch =
    searchParams.get("searchTerm") ?? "";

  const currentSortBy =
    searchParams.get("sortby") ?? "createdAt";

  const currentSortOrder =
    searchParams.get("sortOrder") ?? "desc";

  const currentCategory =
    searchParams.get("categoryId") ?? "all";

  const currentIsActive =
    searchParams.get("isActive");

 const [searchTerm, setSearchTerm] = useState(currentSearch);
const previousSearchRef = useRef(currentSearch);



  /*
   * Update URL parameters.
   */
  const updateQuery = (
    updates: Record<string, string | null>,
  ) => {
    const params = new URLSearchParams(
      searchParams.toString(),
    );

    Object.entries(updates).forEach(
      ([key, value]) => {
        if (
          value === null ||
          value === "" ||
          value === "all"
        ) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      },
    );

    const queryString = params.toString();

    router.push(
      queryString
        ? `${pathname}?${queryString}`
        : pathname,
    );
  };

    /*
   * Keep input synchronized with URL.
   */
 useEffect(() => {
  if (searchTerm === previousSearchRef.current) {
    return;
  }

  const timer = setTimeout(() => {
    updateQuery({
      searchTerm: searchTerm || null,
    });

    previousSearchRef.current = searchTerm;
  }, 400);

  return () => clearTimeout(timer);
}, [searchTerm]);

  /*
   * Search debounce.
   *
   * This prevents a request for every
   * single keystroke.
   */
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (searchTerm === currentSearch) {
  //       return;
  //     }

  //     updateQuery({
  //       searchTerm: searchTerm || null,
  //     });
  //   }, 400);

  //   return () => clearTimeout(timer);
  // }, [searchTerm]);

  /*
   * Sorting.
   */
  const handleSortChange = (
    value: string,
  ) => {
    switch (value) {
      case "newest":
        updateQuery({
          sortby: "createdAt",
          sortOrder: "desc",
        });
        break;

      case "title-asc":
        updateQuery({
          sortby: "title",
          sortOrder: "asc",
        });
        break;

      case "title-desc":
        updateQuery({
          sortby: "title",
          sortOrder: "desc",
        });
        break;

      case "price-low":
        updateQuery({
          sortby: "price",
          sortOrder: "asc",
        });
        break;

      case "price-high":
        updateQuery({
          sortby: "price",
          sortOrder: "desc",
        });
        break;

      default:
        updateQuery({
          sortby: "createdAt",
          sortOrder: "desc",
        });
    }
  };

  /*
   * Convert backend sorting parameters
   * back into the UI value.
   */
  const selectedSort =
    currentSortBy === "createdAt" &&
    currentSortOrder === "desc"
      ? "newest"
      : currentSortBy === "title" &&
          currentSortOrder === "asc"
        ? "title-asc"
        : currentSortBy === "title" &&
            currentSortOrder === "desc"
          ? "title-desc"
          : currentSortBy === "price" &&
              currentSortOrder === "asc"
            ? "price-low"
            : currentSortBy === "price" &&
                currentSortOrder === "desc"
              ? "price-high"
              : "newest";

  /*
   * Category.
   */
  const handleCategoryChange = (
    value: string,
  ) => {
    updateQuery({
      categoryId:
        value === "all" ? null : value,
    });
  };

  /*
   * Active / inactive filter.
   */
  const showAllServices =
    currentIsActive === null;

  const handleStatusChange = () => {
    updateQuery({
      isActive: showAllServices
        ? "true"
        : null,
    });
  };

  /*
   * Clear all filters.
   */
  const clearFilters = () => {
    router.push(pathname);
    setSearchTerm("");
  };

  const hasFilters =
    Boolean(currentSearch) ||
    currentCategory !== "all" ||
    currentIsActive !== null ||
    selectedSort !== "newest";

  return (
    <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

            <Input
              type="text"
              placeholder="Search services by name or description..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              className="pl-10 py-2 h-10"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3 flex-wrap">
            {/* Sort */}
            <div className="flex-1 min-w-50">
              <Select
                value={selectedSort}
                onValueChange={handleSortChange}
              >
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>

                <SelectContent className="bg-white">
                  <SelectItem value="newest">
                    Newest
                  </SelectItem>

                  <SelectItem value="title-asc">
                    Title (A-Z)
                  </SelectItem>

                  <SelectItem value="title-desc">
                    Title (Z-A)
                  </SelectItem>

                  <SelectItem value="price-low">
                    Price (Low to High)
                  </SelectItem>

                  <SelectItem value="price-high">
                    Price (High to Low)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category */}
            <div className="flex-1 min-w-50">
              <Select
                value={currentCategory}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>

                <SelectContent className="bg-white">
                  <SelectItem value="all">
                    All Categories
                  </SelectItem>

                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <Button
            disabled
              variant={
                showAllServices
                  ? "default"
                  : "outline"
              }
              size="sm"
              onClick={handleStatusChange}
              className="h-10 px-4"
            >
              {showAllServices
                ? "All Services"
                : "Active Only"}
            </Button>
          </div>

          {/* Active Filters */}
          {hasFilters && (
            <div className="flex flex-wrap gap-2 items-center">
              {/* Search */}
              {currentSearch && (
                <Badge
                  variant="secondary"
                  className="gap-1"
                >
                  Search: {currentSearch}

                  <button
                    type="button"
                    onClick={() =>
                      updateQuery({
                        searchTerm: null,
                      })
                    }
                    className="ml-1 hover:opacity-70"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}

              {/* Category */}
              {currentCategory !== "all" && (
                <Badge
                  variant="secondary"
                  className="gap-1"
                >
                  {
                    categories.find(
                      (category) =>
                        category.id === currentCategory,
                    )?.name
                  }

                  <button
                    type="button"
                    onClick={() =>
                      updateQuery({
                        categoryId: null,
                      })
                    }
                    className="ml-1 hover:opacity-70"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}

              {/* Active */}
              {currentIsActive === "true" && (
                <Badge
                  variant="secondary"
                  className="gap-1"
                >
                  Active Services Only

                  <button
                    type="button"
                    onClick={() =>
                      updateQuery({
                        isActive: null,
                      })
                    }
                    className="ml-1 hover:opacity-70"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}

              {/* Clear */}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-7 text-xs"
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}