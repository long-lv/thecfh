"use client";

import ThecfhInput from "@/src/components/thecfhInput";
import TheCfhLabel from "@/src/components/thecfhLabel";
import { yupResolver } from "@hookform/resolvers/yup";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { defaultData } from "../constaint";
import { productSchema, TYProductSchema } from "../schema";
import IPropsProductForm from "./type";
import ThecfhSelect from "@/src/components/thecfhSelect";
import ThecfhLabel from "@/src/components/thecfhLabel";

const TinyEditor = dynamic(() => import("../../../../../components/tiniMceEditor"), {
  ssr: false,
});

export default function FormProduct(props: IPropsProductForm) {
  const { data, mode, categoriesList, onSubmit, onCancel } = props;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TYProductSchema>({
    resolver: yupResolver(productSchema),
    mode: "onChange",
    defaultValues: defaultData,
  });

  useEffect(() => {
    console.log(categoriesList, "categoriesList");
  }, [categoriesList]);

  return (
    <div className="container-form">
      <div className="form-wrap !mb-2">
        <ThecfhLabel label="Name" required={true} />
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <ThecfhInput
              {...field}
              placeholder="product name..."
              width="100%"
              error={fieldState.error?.message}
            />
          )}
        />
      </div>
			<div className="form-wrap !mb-2">
        <TheCfhLabel label="Description" required={true} />
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field: { value, onChange, onBlur } }) => (
            <div style={{ width: "100%" }}>
              <TinyEditor 
                value={value} 
                onChange={onChange}
                onBlur={onBlur}
              />
              {errors.description && (
                <p style={{ color: "red", fontSize: 13, marginTop: 4 }}>
                  {errors.description.message}
                </p>
              )}
            </div>
          )}
        />
      </div>
			<div className="form-wrap !mb-2">
				<ThecfhLabel label="Category" required/>
				<Controller
					name="categoryId"
					control={control}
					render={({ field, fieldState}) => (
						<ThecfhSelect value={String(field.value)} error={fieldState?.error?.message} options={categoriesList}></ThecfhSelect>
					)}
				/>
			</div>
    </div>
  );
}
