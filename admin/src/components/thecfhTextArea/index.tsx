import { TextareaAutosize } from "@mui/material";
import IPropThecfhTextArea from "./type";

export default function ThecfhTextArea(props: IPropThecfhTextArea) {
	const {
    placeholder,
    value,
    className,
    classNameInput,
    style,
    styleInput,
    disabled,
    error,
		width,
		minRows = 3,
		defaultValue,
    onChange,
		onBlur
  } = props;
  return (
    <div className={`${className || ""}`} style={{ ...style }}>
      <div className="w-full">
        <TextareaAutosize
					minRows={minRows}
          className={`
                border rounded px-3 py-2 focus:outline-none 
                font-normal text-sm
                border-[var(--color-gray-border)]
                text-[var(--color-text-1)]
                leading-[var(--line-height-100-percent)]
                gap-2 flex 
								${error ? "border-red-500" : "border-[var(--color-gray-border)]"}
                ${classNameInput || ""}
              `}
          style={{
						width,
            ...(styleInput || {}),
          }}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
					defaultValue={defaultValue}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={() => onBlur}
        />
      </div>
      {error && (
        <span className="text-red-500 text-sm block !mt-2">{error}</span>
      )}
    </div>
  );
}
