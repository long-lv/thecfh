"use client";
import Image from "next/image";
import styles from "./style.module.css";
import { IPropsThecfhInput } from "./type";
import passwordEye from "@/src/assets/images/passwordEye.svg";
import passwordEyeClose from "@/src/assets/images/passwordEyeClose.svg";

const ThecfhInput = (props: IPropsThecfhInput) => {
  const {
    placeholder,
    value,
    type = "text",
    className,
    classNameInput,
    style,
    styleInput,
    disabled,
    width,
    error,
		onBlur,
    onChange,
    onKeyDown,
    onKeyUp,
    changePasswordIcon
  } = props;

  const getPasswordIcon = () => {
    return type === "password" ? passwordEyeClose : passwordEye;
  };
  return (
    <div className={`${className || ""}`} style={{ ...style }}>
      <div className={styles.inputContainer}>
        <input
          className={`
                border rounded px-3 py-2 focus:outline-none 
                font-normal text-sm
                border-[var(--color-gray-border)]
                text-[var(--color-text-1)]
                leading-[var(--line-height-100-percent)]
                gap-2 flex 
								${error ? 'border-red-500' : 'border-[var(--color-gray-border)]'}
                ${classNameInput || ""}
              `}
          style={{
            width,
            ...(styleInput || {}),
          }}
          type={type}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
          onKeyDown={(e) => onKeyDown?.(e)}
          onKeyUp={(e) => onKeyUp?.(e)}
					onBlur={onBlur}
        />
        {changePasswordIcon && (
          <Image
            src={getPasswordIcon()}
            alt="passwordIcon"
            width={20}
            height={20}
            onClick={changePasswordIcon}
            className="cursor-pointer"
          />
        )}
      </div>
      {error && (
        <span className="text-red-500 text-sm block !mt-2">{error}</span>
      )}
    </div>
  );
};

export default ThecfhInput;
