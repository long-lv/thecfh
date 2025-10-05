'use client'
import styles from "./style.module.css"
import { IPropsThecfhInput } from "./type"

const ThecfhInput = (props: IPropsThecfhInput) => {
    const {
        placeholder,
        value,
        type = 'text',
        className,
        style,
        disabled,
        onChange,
        onKeyDown,
        onKeyUp,
        width,
    } = props;

    return (
        <div 
            className={`${styles.inputContainer} ${className || ''}`}
            style={{ ...style }}
        >
            <input 
                className="
                border rounded px-3 py-2 focus:outline-none 
                font-normal text-sm
                border-[var(--color-gray-border)]
                text-[var(--color-text-1)]
                leading-[var(--line-height-100-percent)]
                gap-2
              "
                style={{ 
                    width,
                    ...(style || {})
                }}
                type={type}
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                onChange={(e) => onChange?.(e.target.value)}
                onKeyDown={(e) => onKeyDown?.(e)}
                onKeyUp={(e) => onKeyUp?.(e)}
            />
        </div>
    );
};

export default ThecfhInput;