import { modeFormProduct } from "../type";
import { TYProductSchema } from "../schema";
import { IDropDown } from "@/src/constants";

export default interface IPropsProductForm {
	data?: null | TYProductSchema;
	mode: modeFormProduct;
	categoriesList?: IDropDown[];
	onSubmit?: (data: TYProductSchema) => void; 
	onCancel?: () => void;
}
