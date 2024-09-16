'use client'

import React from "react";
export default function useShowPassword() {
  const [showPassword, setShowPassword] = React.useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return { showPassword, togglePasswordVisibility };
}