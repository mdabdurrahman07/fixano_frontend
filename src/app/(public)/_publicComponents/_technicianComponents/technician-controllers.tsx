"use client";

import { useEffect, useState } from "react";
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
  BadgeCheck,
} from "lucide-react";

export function TechnicianControls() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSearch =
    searchParams.get("searchTerm") ?? "";

  const currentSortBy =
    searchParams.get("sortby") ?? "createdAt";

  const currentSortOrder =
    searchParams.get("sortOrder") ?? "desc";

  const currentIsVerified =
    searchParams.get("isVerified");

  const [searchTerm, setSearchTerm] =
    useState(currentSearch);

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
          value === ""
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
   * Search debounce.
   */
  useEffect(() => {
    if (searchTerm === currentSearch) {
      return;
    }

    const timer = setTimeout(() => {
      updateQuery({
        searchTerm: searchTerm || null,
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm, currentSearch]);

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

      case "rating-high":
        updateQuery({
          sortby: "avgRating",
          sortOrder: "desc",
        });
        break;

      case "rating-low":
        updateQuery({
          sortby: "avgRating",
          sortOrder: "asc",
        });
        break;

      case "experience-high":
        updateQuery({
          sortby: "yearsExperience",
          sortOrder: "desc",
        });
        break;

      case "experience-low":
        updateQuery({
          sortby: "yearsExperience",
          sortOrder: "asc",
        });
        break;

      case "rate-low":
        updateQuery({
          sortby: "hourlyRate",
          sortOrder: "asc",
        });
        break;

      case "rate-high":
        updateQuery({
          sortby: "hourlyRate",
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
      : currentSortBy === "avgRating" &&
          currentSortOrder === "desc"
        ? "rating-high"
        : currentSortBy === "avgRating" &&
            currentSortOrder === "asc"
          ? "rating-low"
          : currentSortBy ===
                "yearsExperience" &&
              currentSortOrder === "desc"
            ? "experience-high"
            : currentSortBy ===
                  "yearsExperience" &&
                currentSortOrder === "asc"
              ? "experience-low"
              : currentSortBy ===
                    "hourlyRate" &&
                  currentSortOrder === "asc"
                ? "rate-low"
                : currentSortBy ===
                      "hourlyRate" &&
                    currentSortOrder === "desc"
                  ? "rate-high"
                  : "newest";

  /*
   * Verified filter.
   */
  const showAllTechnicians =
    currentIsVerified === null;

  const handleVerificationChange = () => {
    updateQuery({
      isVerified: showAllTechnicians
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
    currentIsVerified !== null ||
    selectedSort !== "newest";

  return (
    <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

            <Input
              type="text"
              placeholder="Search technicians..."
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
            <div className="flex-1 min-w-[200px]">
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

                  <SelectItem value="rating-high">
                    Rating (High to Low)
                  </SelectItem>

                  <SelectItem value="rating-low">
                    Rating (Low to High)
                  </SelectItem>

                  <SelectItem value="experience-high">
                    Experience (High to Low)
                  </SelectItem>

                  <SelectItem value="experience-low">
                    Experience (Low to High)
                  </SelectItem>

                  <SelectItem value="rate-low">
                    Hourly Rate (Low to High)
                  </SelectItem>

                  <SelectItem value="rate-high">
                    Hourly Rate (High to Low)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Verified */}
            <Button
              variant={
                showAllTechnicians
                  ? "default"
                  : "outline"
              }
              size="sm"
              onClick={handleVerificationChange}
              className="h-10 px-4"
            >
              <BadgeCheck className="w-4 h-4 mr-2" />

              {showAllTechnicians
                ? "All Technicians"
                : "Verified Only"}
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
                    onClick={() => {
                      setSearchTerm("");

                      updateQuery({
                        searchTerm: null,
                      });
                    }}
                    className="ml-1 hover:opacity-70"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}

              {/* Verified */}
              {currentIsVerified === "true" && (
                <Badge
                  variant="secondary"
                  className="gap-1"
                >
                  Verified Technicians Only

                  <button
                    type="button"
                    onClick={() =>
                      updateQuery({
                        isVerified: null,
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