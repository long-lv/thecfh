import { ICategories } from "@/src/lib/type/categories.type";

export enum modeFormCateogy{
	VIEW=1,
	CREATE= 2,
	EDIT=3,
}
export interface IPropDetailCategory {
	data: Partial<ICategories | null>;
	isOpen: boolean;
	mode: modeFormCateogy;
	onSubmit: (data: ICategories) => void;
	onCancel: () => void;
}