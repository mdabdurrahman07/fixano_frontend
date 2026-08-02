"use server";
export const getAllCategories = async () => {
  const url = process.env.BACKEND_API_URL;
  const response = await fetch(`${url}/categories`, {
    cache: "force-cache",
    next: {
      revalidate: 3600,
    },
  });
  const result = await response.json();
  return result;
};
