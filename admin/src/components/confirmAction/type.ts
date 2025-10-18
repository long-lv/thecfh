export interface IPropsDialogConfirmAction {
	isOpen: boolean;
	title?: string;
	content?: string;
	onOke: () => void;
	onCancel: () => void;
}