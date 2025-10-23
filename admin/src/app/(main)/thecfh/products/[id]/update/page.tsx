'use client'
import { useGetCategories } from "@/src/hooks/useCategories";
import { useEffect, useState } from "react";
import { defaulQueryGetCategories } from "../../constaint";
import { IDropDown } from "@/src/constants";
import FormProduct from "../../components/productForm/productForm";
import { modeFormProduct } from "../../type";
import { useRouterUtil } from "@/src/hooks/useRouterWithLoading";
import { useGetProductById } from "@/src/hooks/useProducts";
import { IProduct } from "@/src/lib/type/products.type";
import { useGlobalToast } from "@/src/hooks/useGlobalToast";
import { TYProductSchema } from "../../schema";
import { TheCfhUtils } from "@/src/utils/thecfhUtils";

export default function Update() {
  const { data: dataCategoriesList } = useGetCategories(
    defaulQueryGetCategories
  );

	const toast = useGlobalToast();
  const [optionCategories, setOptionCategories] = useState<IDropDown[]>([]);

	const [product, setProduct] = useState<TYProductSchema | null>(null);

	const {params} = useRouterUtil();
	const {data: productData, isError} = useGetProductById(Number(params.id))

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
      />
    </div>
  );
}
