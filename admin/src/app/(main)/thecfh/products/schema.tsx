import * as yup from "yup";

export const productSchema = yup.object().shape({
	name: yup
	.string()
	.trim()
	.required('name is not empty')
	.min(3, 'product name is less than 3 character')
	.max(100, 'product name is more than 100 character'),
	
	description: yup
	.string()
	.trim()
	.required('description is not required')
	.min(3, 'description is less than 3 character'),

	price: yup
	.number()
	.required('price is not required')
	.min(0, 'price is less than 0')
	.max(999999999, 'price is most than to'),

	categoryId: yup
	.number()
	.required('price is not required')
	.min(0, 'category id is less than 0')
})

export type TYProductSchema = yup.InferType<typeof productSchema>;