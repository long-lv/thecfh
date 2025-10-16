import { IDropDown } from "@/src/constants";

export interface ISingleDropDownProps {
	value?: string;
	options: IDropDown[];
  isMoreIcon?: boolean;
  classWrap?: React.CSSProperties;
  classMenu?: React.CSSProperties;
	maxHeight?: string;
	width?: string;
	minWidthButton?: string;
	onChangeValue: (val: string) => void;
}
