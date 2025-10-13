"use client";
import ThecfhInput from "@/src/components/thecfhInput";
import styles from "./style.module.css";
import ThecfhButton from "@/src/components/thecfhButton";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { LoginFormValues, loginSchema } from "./schema";
import { useLogin } from "@/src/hooks/useAuth";
import { useGlobalToast } from "@/src/hooks/useGlobalToast";
import { useGlobalLoading } from "@/src/hooks/useGlobalLoading";
import { useRouter } from "next/navigation";
import { AxiosError, HttpStatusCode } from "axios";
import { ApiErrorResponse } from "@/src/lib/type/api.type";
export default function LoginPage() {
	/** [State] form control */
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

	/** [State] useAuth api */
	const { mutate } = useLogin();

	/** [State] toast messsage */
	const toast = useGlobalToast();

	/** [State] loading */
	const loading = useGlobalLoading();

	/** [State] router */
	const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (data: LoginFormValues) => {
		loading.showLoading()
    mutate(data, {
			onSuccess: () => {
				toast.success('login success')
				router.push('thecfh/categories')
			},
			onError: (error: AxiosError<ApiErrorResponse>) => {
				if (error.response?.status === HttpStatusCode.Unauthorized) { // đây là status của request, còn status do api trả ra phải trọc vòa response.data
					toast.error('wrong password or email, pleasa again!')
				} else {
					if (error.response?.data.message) {
						toast.error(error.response?.data.message)
					}
				}
			},
			onSettled: () => { // onSettled giong finally
				loading.hideLoading()
			}
		})
  };
  return (
    <div className={styles["wrapperLogin"]}>
      <h4 className="font-bold text-[32px] leading-[100%] text-black">Login</h4>
      <div className="gap-5 flex flex-col">
        <div className="wrap-input flex flex-col gap-3">
          <label className="text-lg font-medium text-[var(--color-black-1)] leading-[100%]">
            Email
          </label>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <ThecfhInput
                {...field}
                error={fieldState.error?.message}
                classNameInput="min-w-[440px]"
              />
            )}
          />
        </div>
        <div className="wrap-input flex flex-col gap-3">
          <label className="text-lg font-medium text-[var(--color-black-1)] leading-[100%]">
            Password
          </label>
          <Controller
            name="password"
            defaultValue={""}
            control={control}
            render={({ field, fieldState }) => (
              <ThecfhInput
                {...field}
                classNameInput="min-w-[440px]"
                type={showPassword ? "text" : "password"}
                error={fieldState.error?.message}
                changePasswordIcon={() => setShowPassword(!showPassword)}
              />
            )}
          ></Controller>
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
						disabled={!isValid}
            onClick={handleSubmit(handleLogin)}
          />
        </div>
      </div>
    </div>
  );
}
