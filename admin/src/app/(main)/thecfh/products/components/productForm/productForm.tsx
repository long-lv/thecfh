"use client";

import ThecfhButton from "@/src/components/thecfhButton";
import ThecfhInput from "@/src/components/thecfhInput";
import { default as TheCfhLabel, default as ThecfhLabel } from "@/src/components/thecfhLabel";
import ThecfhSelect from "@/src/components/thecfhSelect";
import { TheCfhUtils } from "@/src/utils/thecfhUtils";
import { yupResolver } from "@hookform/resolvers/yup";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { defaultData } from "../../constaint";
import { productSchema, TYProductSchema } from "../../schema";
import { modeFormProduct } from "../../type";
import DropFile from "../dropFile/dropFile";
import IPropsProductForm from "../type";

const TinyEditor = dynamic(
  () => import("../../../../../../components/tiniMceEditor"),
  {
    ssr: false,
  }
);

export default function FormProduct(props: IPropsProductForm) {
  const { data, mode, categoriesList, onSubmit } = props;
  const {
    control,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<TYProductSchema>({
    resolver: yupResolver(productSchema),
    mode: "onSubmit",
    defaultValues: defaultData,
    reValidateMode: "onSubmit",
    shouldUnregister: true,
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [imagesUrl, setImagesUrl] = useState<string[]>([]);

  const onHandleClickSubmit = (dataFrom: TYProductSchema) => {
    onSubmit?.(dataFrom);
    if (mode === modeFormProduct.CREATE) {
      reset(defaultData);
      clearErrors();
      setSelectedFiles([]);
    }
  };

  useEffect(() => {
    reset({
      name: data?.name,
      description: data?.description,
      categoryId: data?.categoryId,
      price: data?.price,
    });
    if (data?.images && data?.images.length > 0) {
      const formImages: string[] = (data.images ?? []).filter(
        (i): i is string => typeof i === "string"
      );
      setImagesUrl(formImages);
    }
  }, [data]);


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
              <TinyEditor value={value} onChange={onChange} onBlur={onBlur} />
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
        <ThecfhLabel label="Category" required={true} />
        <Controller
          name="categoryId"
          control={control}
          render={({ field, fieldState }) => (
            <ThecfhSelect
              value={String(field.value)}
              error={fieldState?.error?.message}
              options={categoriesList}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <div className="form-wrap !mb-2">
        <ThecfhLabel label="Price" required={true} />
        <Controller
          name="price"
          control={control}
          render={({ field, fieldState }) => (
            <ThecfhInput
              value={field.value || ""}
              type="text"
              placeholder="price..."
              width="100%"
              onChange={field.onChange}
              onBlur={(e) => {
                const formatedData = TheCfhUtils.formatedPrice(e.target.value);
                field.onChange(formatedData);
              }}
              error={fieldState.error?.message}
            />
          )}
        />
      </div>

      <div className="form-wrap !mb-2">
        <ThecfhLabel label="Images" />
        <Controller
          name="images"
          control={control}
          render={({ field }) => (
            <DropFile
              onChange={(files) => {
                const onlyFiles = files.filter((f): f is File => f instanceof File);
                const onlyUrls = files.filter((f): f is string => typeof f === 'string');
                field.onChange(files);
                setSelectedFiles(onlyFiles);
                setImagesUrl(onlyUrls);
              }}
							imageUrls={imagesUrl}
              files={selectedFiles}
            />
          )}
        />
      </div>

      <div className="flex justify-end">
        <ThecfhButton
          label="Submit"
          onClick={handleSubmit(onHandleClickSubmit)}
        />
      </div>
    </div>
  );
}
