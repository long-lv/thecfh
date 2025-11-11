'use client'
import { useGetCategories } from "@/src/hooks/useCategories";
import { useEffect, useState } from "react";
import { defaulQueryGetCategories } from "../../constaint";
import { IDropDown } from "@/src/constants";
import FormProduct from "../../components/productForm/productForm";
import { modeFormProduct } from "../../type";
import { useRouterUtil } from "@/src/hooks/useRouterWithLoading";
import { useGetProductById, useUpdateProduct } from "@/src/hooks/useProducts";
import { useGlobalToast } from "@/src/hooks/useGlobalToast";
import { TYProductSchema } from "../../schema";
import { TheCfhUtils } from "@/src/utils/thecfhUtils";
import { useGlobalLoading } from "@/src/hooks/useGlobalLoading";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/src/lib/type/api.type";
import { MESSAGE_ERROR_ACTION_DEFAULT } from "../../../categories/constant";

export default function Update() {
  const { data: dataCategoriesList } = useGetCategories(
    defaulQueryGetCategories
  );

	const updateProduct = useUpdateProduct();
	const toast = useGlobalToast();
	const loading = useGlobalLoading();
  const [optionCategories, setOptionCategories] = useState<IDropDown[]>([]);

	const [product, setProduct] = useState<TYProductSchema | null>(null);

	const {params} = useRouterUtil();
	const {data: productData, isError} = useGetProductById(Number(params.id))

	const handleSubmitUpdate = (data: TYProductSchema) => {
		console.log(data, 'datadatadata');
    loading.showLoading();
    const mutationOptions = {
      onSuccess: () => {
        toast.success("Update product success");
      },
      onError: (error: AxiosError<ApiErrorResponse>) => {
        toast.error(
          error.response?.data.message ?? MESSAGE_ERROR_ACTION_DEFAULT
        );
      },
      onSettled: () => {
        loading.hideLoading();
      },
    };
		if (data.images && data.images.length > 0) {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", String(TheCfhUtils.convertPriceFormatToNumber(data.price)));
      formData.append("categoryId", String(data.categoryId));
			formData.append("fileRemove", (data.filesRemove && data.filesRemove.length > 0) ? JSON.stringify(data.filesRemove) : '');
      data.images.forEach((file) => {
        if (file) {
          formData.append("images", file);
        }
      });
      updateProduct.mutate({id: Number(params.id), data: formData}, mutationOptions);
    } else {
      const productData = {
        name: data.name,
        description: data.description,
        categoryId: data.categoryId,
        price: String(TheCfhUtils.convertPriceFormatToNumber(data.price)),
      };
      updateProduct.mutate({id: Number(params.id), data: productData}, mutationOptions);
    }
  }

	useEffect(() => {
		if (productData && productData.data) {
			const formatedData = {
				name: productData.data.name,
				categoryId: productData.data.categoryId,
				price: productData.data.price,
				images: TheCfhUtils.splitImages(productData.data.imgUrl),
				description: productData.data.description,
			} as TYProductSchema;
			setProduct(formatedData);
		}
	},[productData])

  useEffect(() => {
    if (
      dataCategoriesList &&
      dataCategoriesList.data &&
      dataCategoriesList.data.length > 0
    ) {
      const mappedDataDropDown = dataCategoriesList.data.map((data) => {
        return {
          label: data.name,
          value: data.id,
        };
      });
      setOptionCategories(mappedDataDropDown);
    }
  }, [dataCategoriesList]);

	useEffect(() => {
		if (isError) {
			toast.error('Get product error');
		}
	}, [isError])
  return (
    <div className="container h-full overflow-y-auto">
      <FormProduct
        mode={modeFormProduct.EDIT}
        categoriesList={optionCategories}
				data={product}
				onSubmit={handleSubmitUpdate}
      />
    </div>
  );
}
