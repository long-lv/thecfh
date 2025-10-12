"use client";
import ThecfhInput from "@/src/components/thecfhInput";
import styles from "./style.module.css";
import ThecfhButton from "@/src/components/thecfhButton";
import { useState } from "react";
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={styles["wrapperLogin"]}>
      <h4 className="font-bold text-[32px] leading-[100%] text-black">Login</h4>
      <div className="gap-5 flex flex-col">
        <div className="wrap-input flex flex-col gap-3">
          <label className="text-lg font-medium text-[var(--color-black-1)] leading-[100%]">
            Email
          </label>
          <ThecfhInput classNameInput="min-w-[440px]" />
        </div>
        <div className="wrap-input flex flex-col gap-3">
          <label className="text-lg font-medium text-[var(--color-black-1)] leading-[100%]">
            Password
          </label>
          <ThecfhInput
            classNameInput="min-w-[440px]"
            type={showPassword ? "text" : "password"}
            changePasswordIcon={() => setShowPassword(!showPassword)}
            error="Password is required"
          />
        </div>
        <div className="flex gap-2.5 min-w-[449px] justify-end">
          <span className="font-medium text-[var(--color-blue-200)] leading-[100%] text-[13px]">
            Forgot password?
          </span>
        </div>

        <div className="w-full flex justify-center">
          <ThecfhButton
            label="Login"
            className="w-[236px] px-5 py-2.5 rounded-[10px] bg-[var(--color-blue-200)] gap-2.5"
            classNameLabel="font-[600] text-base text-white leading-[100%]"
          />
        </div>
      </div>
    </div>
  );
}
