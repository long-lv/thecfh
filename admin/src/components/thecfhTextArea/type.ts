export default interface IPropThecfhTextArea {
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  classNameInput?: string;
  styleInput?: React.CSSProperties;
  style?: React.CSSProperties;
	error?: string;
	width?: string;
	minRows?: number;
	defaultValue?: string;
  onChange?: (value: string) => void;
	onBlur? : (event: React.FocusEvent<HTMLTextAreaElement>) => void;
}
