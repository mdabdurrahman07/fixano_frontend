export async function getService(serviceId: string) {
  const url = process.env.BACKEND_API_URL;
  const response = await fetch(`${url}/services/${serviceId}`, {
    cache: "no-cache",
  });

  const result = await response.json();
  return result;
}
