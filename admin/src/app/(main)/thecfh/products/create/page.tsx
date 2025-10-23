'use client'
import { useGetCategories } from "@/src/hooks/useCategories";
import FormProduct from "../components/productForm/productForm";
import { defaulQueryGetCategories, defaultData } from "../constaint";
import { modeFormProduct } from "../type";
import { useEffect, useState } from "react";
import { IDropDown } from "@/src/constants";
import { useGlobalLoading } from "@/src/hooks/useGlobalLoading";
import { useGlobalToast } from "@/src/hooks/useGlobalToast";
import { TYProductSchema } from "../schema";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/src/lib/type/api.type";
import { MESSAGE_ERROR_ACTION_DEFAULT } from "../../categories/constant";
import { useCreateProduct } from "@/src/hooks/useProducts";
import { TheCfhUtils } from "@/src/utils/thecfhUtils";
export default function Create() {
	const loading = useGlobalLoading();
	const toast = useGlobalToast();
	const createProduct = useCreateProduct();
	const { data } = useGetCategories(defaulQueryGetCategories);
	const [optionCategories, setOptionCategories] = useState<IDropDown[]>([]);

	const handleCreateProduct = (data: TYProductSchema) => {
		loading.showLoading();
		const mutationOptions = {
      onSuccess: () => {
        toast.success("Create product success");
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
      data.images.forEach((file) => {
        if (file) {
          formData.append("images", file);
        }
      });
      createProduct.mutate(formData, mutationOptions);
    } else {
      const productData = {
        name: data.name,
        description: data.description,
        categoryId: data.categoryId,
        price: String(TheCfhUtils.convertPriceFormatToNumber(data.price)),
      };
      createProduct.mutate(productData, mutationOptions);
    }
	}
	useEffect(() => {
		if (data && data.data && data.data.length > 0) {
			const mappedDataDropDown = data.data.map(data => {
				return {
					label: data.name,
					value: data.id,
				}
			})
			setOptionCategories(mappedDataDropDown);
		}
	},[data]);
	return (
		<div className="container h-full overflow-y-auto">
			<FormProduct mode={modeFormProduct.CREATE} data={defaultData} categoriesList={optionCategories} onSubmit={handleCreateProduct}/>
		</div>
	)
}