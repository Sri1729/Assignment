"use client";

import { Button, Input } from "@/components";
import { authenticateUser } from "@/services";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const onClick = async () => {
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = passwordRegex.test(password);
    if (!isEmailValid) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
    if (!isPasswordValid) {
      setPasswordError("Password is not in required format");
    } else {
      setPasswordError("");
    }

    if (!isPasswordValid || !isEmailValid) {
      return;
    }

    setLoading(true);
    const response = await authenticateUser(email, password);
    setLoading(false);
    if (response?.user_type === "type_1") {
      router.push("/type_1_home");
    }
    if (response?.user_type === "type_2") {
      router.push("/type_2_home");
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Sign in to your account
        </h1>
        <div className="space-y-4 md:space-y-6">
          <Input
            displayText="Email*"
            label="email"
            placeholder="abc@domain.com"
            type="email"
            value={email}
            setValue={setEmail}
            errorMessage={emailError}
            leftIcon={<MdOutlineMail />}
          />

          <Input
            displayText="Password*"
            label="password"
            placeholder="********"
            type={showPassword ? "text" : "password"}
            value={password}
            setValue={setPassword}
            errorMessage={passwordError}
            leftIcon={<RiLockPasswordLine />}
            helperText="(must be at least 8 characters, include one of each uppercase, lowercase, number, and special character)"
            rightIcon={!showPassword ? <FaEye /> : <FaRegEyeSlash />}
            onRightIconClick={() => setShowPassword(!showPassword)}
          />

          <Button loading={loading} text="Sign in" onClick={() => onClick()} />
        </div>
      </div>
    </div>
  );
}
