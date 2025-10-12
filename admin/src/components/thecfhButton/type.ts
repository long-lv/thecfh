export interface IPropsThecfhButton {
    label: string;
    width?: string;
    height?: string;
    className?: string;
    classNameLabel?: string;
    style?: React.CSSProperties;
    styleLabel?: React.CSSProperties;
    disabled?: boolean;
    onClick?: () => void;
}