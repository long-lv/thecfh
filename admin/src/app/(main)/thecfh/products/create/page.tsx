'use client'
import { useGetCategories } from "@/src/hooks/useCategories";
import FormProduct from "../components/productForm/productForm";
import { defaulQueryGetCategories, defaultData } from "../constaint";
import { modeFormProduct } from "../type";
import { useEffect, useState } from "react";
import { IDropDown } from "@/src/constants";
export default function Create() {
	const { data } = useGetCategories(defaulQueryGetCategories);
	const [optionCategories, setOptionCategories] = useState<IDropDown[]>([]);
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
		<div className="container">
			<FormProduct mode={modeFormProduct.CREATE} data={defaultData} categoriesList={optionCategories}/>
		</div>
	)
}