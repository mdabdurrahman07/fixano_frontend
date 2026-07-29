import React from "react";
import { AuthWrapper } from "../_authComponents/AuthWrapper";
import { RegisterForm } from "../_authComponents/RegisterForm";

const page = () => {
  return (
    <AuthWrapper>
      <RegisterForm />
    </AuthWrapper>
  );
};

export default page;
