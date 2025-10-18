import { modeFormCateogy } from "./components/detailCategory/type";

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
		value: modeFormCateogy.EDIT as unknown as string,
	},
	{
		label: 'Delete',
		value: modeFormCateogy.DELETE as unknown as string
	}
]


export const MESSAGE_ERROR_ACTION_DEFAULT ="Error action"