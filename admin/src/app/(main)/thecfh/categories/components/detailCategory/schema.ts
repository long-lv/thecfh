import * as yup from "yup";
export const categorySchema = yup.object().shape({
	name: yup
	.string()
	.trim()
	.required('name is not empty')
	.min(3, 'category name is not than 3 character!')
	.max(100, 'category name is than 100 character!')
	.required('category name is not empty!'),

	description: yup
	.string()
	.trim()
	.required('description is not empty')
	.min(3, 'description is not than 3 character!')
	.max(250, 'description can than more 250 character!')
})

export type TYCategorySchema = yup.InferType<typeof categorySchema>;