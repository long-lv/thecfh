export interface IPropsThecfhInput {
    placeholder?: string;
    value?: string;
    type?: 'text' | 'number' | 'password';
    className?: string;
    classNameInput?: string;
    styleInput?: React.CSSProperties;
    style?: React.CSSProperties;
    disabled?: boolean;
    width?: string;
    error?: string;
    onChange?: (value: string) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    changePasswordIcon?: () => void;
}