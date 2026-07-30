"use server";

import { ServiceQuery, ServicesResponse } from "@/app/types/types";

export const getAllServices = async (
  query: ServiceQuery = {},
): Promise<ServicesResponse> => {
  const url = process.env.BACKEND_API_URL;

  if (!url) {
    throw new Error("BACKEND_API_URL is not defined");
  }

  const params = new URLSearchParams();

  if (query.searchTerm) {
    params.set("searchTerm", query.searchTerm);
  }

  if (query.sortby) {
    params.set("sortby", query.sortby);
  }

  if (query.sortOrder) {
    params.set("sortOrder", query.sortOrder);
  }

  if (query.categoryId) {
    params.set("categoryId", query.categoryId);
  }

  if (query.technicianId) {
    params.set("technicianId", query.technicianId);
  }

  if (query.isActive !== undefined) {
    params.set("isActive", String(query.isActive));
  }

  const queryString = params.toString();

  const response = await fetch(
    `${url}/services${queryString ? `?${queryString}` : ""}`,
    {
      next: {
        revalidate: 3600,
        tags: ["allServices"],
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch services");
  }

  const result = response.json();

  return result;
};
