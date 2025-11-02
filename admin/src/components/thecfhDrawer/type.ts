export interface IPropsTheCfhDrawer {
	isOpen: boolean;
	position?: 'left' | 'right'| 'top' | 'bottom';
	className?: string;
	style?: React.CSSProperties;
	children?: React.ReactNode;
	width?: string;
	onClose: () => void;
}