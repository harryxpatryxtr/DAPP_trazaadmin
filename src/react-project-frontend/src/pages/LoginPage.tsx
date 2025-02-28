import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

type Inputs = {
  username: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();
  let navigate = useNavigate();
  const { login } = useAuth();
  const handleLogin = (data: Inputs) => {
    const userData = {
      user_created: "su7dhlg",
      username: data.username,
      role: "admin",
      token: "1234567890"
    };

    // Guardar en localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    // LoginPage()
    login(userData);
    navigate("/permiso");
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Ingrese su usuario y contraseña para iniciar sesión.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Usuario</Label>
                <Input
                  id="username"
                  placeholder="Ingrese su usuario"
                  {...register("username", { required: true })}
                />
                {errors.username && (
                  <span className="text-red-500 text-xs">
                    Este campo es requerido
                  </span>
                )}
              </div>
              <div>
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Ingrese su contraseña"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-red-500 text-xs">
                    Este campo es requerido
                  </span>
                )}
              </div>
              <div>
                <Button type="submit">Login</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
