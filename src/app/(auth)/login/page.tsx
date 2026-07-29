import React from "react";
import { AuthWrapper } from "../_authComponents/AuthWrapper";
import { LoginForm } from "../_authComponents/LoginForm";
// import LoginForm from "../_authComponents/LoginForm";

const LoginPage = () => {
  return (
    <AuthWrapper>
      <LoginForm />
    </AuthWrapper>
  );
};

export default LoginPage;
