import ThecfhDialog from "../thecfhDialog";
import { IPropsDialogConfirmAction } from "./type";

const titleDefault = 'Confirm Action';
const contentDefault = 'Are you success action?'
export default function DialogConfirmAction(props: IPropsDialogConfirmAction){

	const { isOpen, title= titleDefault, content= contentDefault, onOke, onCancel } = props;
	return (
		<ThecfhDialog title={title} open={isOpen} isHiddenBorderBot isHiddenBorderTop 
		confirmButton
		onClose={onCancel} 
		onConfirm={onOke}>
			<p className="text-[16px] font-bold text-black">{content}</p>
		</ThecfhDialog>
	)
}