import { IDropDown } from "@/src/constants";

export interface IPropsThecfhSelect {
    value?: string;
    label?: string;
    options?: IDropDown[];
    placeholder?: string;
    width?: string;
    height?: string;
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    size?: "small" | "medium";
		error?: string;
    onChange?: (value: string) => void;
}