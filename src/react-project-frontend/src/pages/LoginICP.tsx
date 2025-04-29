import React from "react";
import LoginButton from "@/components/icp/LoginButton";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";



const LoginPage: React.FC = () => {
  let navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen">
      <LoginButton />
    </div>
  );
};

export default LoginPage;
