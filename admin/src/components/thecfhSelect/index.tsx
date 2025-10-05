import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { IPropsThecfhSelect } from "./type";
const ThecfhSelect = (props: IPropsThecfhSelect) => {
    const {
        value,
        label,
        options,
        style,
        className,
        width = "325px",
        height = "36px",
        disabled,
        size = "small",
        onChange,
    } = props;
    return (
        <Select
            value={value}
            label={label}
            className={`${className || ""} 
        rounded focus:outline-none 
        text-sm
        border-[var(--color-gray-border)]
        leading-[var(--line-height-100-percent)] 
        gap-2`}
            style={{
                ...style,
                width,
                height,
                color: "var(--color-text-1) !important"
            }}
            sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--color-gray-border)",
                  borderWidth: "1px !important",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--color-gray-border)",
                  borderWidth: "1px !important",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--color-gray-border)",
                  borderWidth: "1px !important",
                },
              }}
            disabled={disabled}
            size={size}
            onChange={(e) => onChange?.(e.target.value)}
        >
            {options &&
                options?.length > 0 &&
                options?.map((option) => {
                    return (
                        <MenuItem value={option.value} key={option.value}>
                            {option.label}
                        </MenuItem>
                    );
                })}
        </Select>
    );
};

export default ThecfhSelect;
