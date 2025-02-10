import { ENV } from "../utils";

// api/getUser.ts
export async function getUser(token: string | null) {
  if (!token) {
    throw new Error("No hay token de autenticación");
  }

  const response = await fetch(`${ENV.API_BASE_URL}/api/users/me?populate=*`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener el usuario");
  }

  const data = await response.json();
  return data;
}
