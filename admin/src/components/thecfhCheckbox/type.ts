export interface IPropsThecfhCheckbox {
    value: boolean;
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    size?: "small" | "medium";
    onChange: (value: boolean) => void;
}