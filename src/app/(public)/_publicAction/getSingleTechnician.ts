"use server"
export const getSingleTechnician = async ({ id }: { id: string }) => {
  const url = process.env.BACKEND_API_URL;

  if (!url) {
    throw new Error("BACKEND_API_URL is not defined");
  }

  const response = await fetch(`${url}/technicians/${id}`, {
    next: {
      revalidate: 3600,
      tags: ["singleTechnician"],
    },
  });

  const result = await response.json();
  return result;
};
