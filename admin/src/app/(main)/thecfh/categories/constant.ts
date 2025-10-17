import { ICategories } from "@/src/lib/type/categories.type";

export const columns = [
  {
    id: "name",
    label: "Category name",
    sortable: true,
  },
  {
    id: "description",
    label: "Category description",
    sortable: false,
  }
];

export const optionAction = [
	{
		label: 'Edit',
		value: 'edit'
	},
	{
		label: 'Delete',
		value: 'delete'
	}
]
