export interface IPropsThecfhInput {
    placeholder?: string;
    value?: string;
    type?: 'text' | 'number' | 'password';
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    width?: string;
    onChange?: (value: string) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}