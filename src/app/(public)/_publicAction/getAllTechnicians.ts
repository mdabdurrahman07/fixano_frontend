"use server";

import { TechnicianQuery, TechniciansResponse } from "@/app/types/types";

export const getAllTechnicians = async (
  query: TechnicianQuery = {},
): Promise<TechniciansResponse> => {
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

  if (query.isVerified !== undefined) {
    params.set("isVerified", String(query.isVerified));
  }

  const queryString = params.toString();

  const response = await fetch(
    `${url}/technicians${queryString ? `?${queryString}` : ""}`,
    {
      next: {
        revalidate: 3600,
        tags: ["allTechnicians"],
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch technicians");
  }

  return response.json();
};
