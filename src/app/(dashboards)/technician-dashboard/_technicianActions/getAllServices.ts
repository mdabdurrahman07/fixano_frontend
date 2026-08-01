"use server";

import { ServicesResponse } from "@/app/types/types";

export const getAllServices = async (): Promise<ServicesResponse> => {
  const url = process.env.BACKEND_API_URL;

  if (!url) {
    throw new Error("BACKEND_API_URL is not defined");
  }

  const response = await fetch(`${url}/services`, {
    next: {
      revalidate: 3600,
      tags: ["all-Services"],
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch services");
  }

  const result = response.json();

  return result;
};
