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
export async function updateUser(
  token: string | null,
  userId: number,
  userData: { username: string; email: string; Marcas: string }
) {
  if (!token) {
    throw new Error("No hay token de autenticación");
  }

  const response = await fetch(`${ENV.API_BASE_URL}/api/users/${userId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar el usuario");
  }

  return await response.json();
}
