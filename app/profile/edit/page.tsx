"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "../../context/authContext";
import { getUser, updateUser } from "../../api/getUser";
import { toast } from "sonner";
const EditProfile = () => {
  const { token } = useAuth();
  const [userData, setUserData] = useState({
    id: 0, // id como número
    username: "",
    email: "",
    Marcas: "", // Usamos "Marcas" para coincidir con lo que retorna la API
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const data = await getUser(token);
        setUserData({
          id: Number(data.id) || 0, // Se asegura que el id es un número
          username: data.username ?? "", // Fallback a cadena vacía si es undefined
          email: data.email ?? "",
          Marcas: data.Marcas ?? "", // Usamos "Marcas"
        });
      } catch (error) {
        console.error("Error al obtener datos del usuario", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !userData.id) return;
    setLoading(true);
    try {
      await updateUser(token, userData.id, userData);

      toast("Información actualizada correctamente");
    } catch (error) {
      console.error("Error al actualizar usuario", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Editar Información</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username">Nombre de Usuario</Label>
            <Input
              id="username"
              name="username"
              value={userData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="Marcas">Marca</Label>
            <Input
              id="Marcas"
              name="Marcas"
              value={userData.Marcas}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditProfile;
