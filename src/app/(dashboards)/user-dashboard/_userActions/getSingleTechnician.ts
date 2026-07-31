export async function getTechnician(technicianId: string) {
  const url = process.env.BACKEND_API_URL;
  const response = await fetch(`${url}/technicians/${technicianId}`, {
    cache: "no-cache",
  });

  const result = await response.json();
  return result;
}
