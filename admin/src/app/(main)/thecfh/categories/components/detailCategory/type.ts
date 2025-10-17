import { ICategories } from "@/src/lib/type/categories.type";

export enum modeFormCateogy{
	VIEW= 1,
	CREATE= 2,
	EDIT= 3,
}

export type TReqDataCategory = Omit<ICategories, 'id' | 'createdAt' | 'updatedAt'>;
export interface IPropDetailCategory {
	data: Partial<ICategories | null>;
	isOpen: boolean;
	mode: modeFormCateogy;
	isSubmitting?: boolean;
	onSubmit: (data: TReqDataCategory) => void;
	onCancel: () => void;
}