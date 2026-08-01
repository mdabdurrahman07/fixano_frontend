"use server";

import { TechniciansResponse } from "@/app/types/types";

export const getAllTechnicians = async (): Promise<TechniciansResponse> => {
  const url = process.env.BACKEND_API_URL;

  if (!url) {
    throw new Error("BACKEND_API_URL is not defined");
  }

  const response = await fetch(`${url}/technicians`, {
    next: {
      revalidate: 3600,
      tags: ["technicianProfile", "allTechnicians"],
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch technicians");
  }

  const result = response.json();

  return result;
};
