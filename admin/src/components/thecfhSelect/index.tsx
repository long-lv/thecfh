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
    error,
    width = "325px",
    height = "36px",
    disabled,
    size = "small",
    onChange,
  } = props;

  return (
    <div>
      <Select
        error={!!error}
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
          color: "var(--color-text-1) !important",
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: error ? "red" : "var(--color-gray-border)",
              borderWidth: "1px !important",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: error ? "red" : "var(--color-gray-border)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: error ? "red" : "var(--color-gray-border)",
            },
          },
        }}
        disabled={disabled}
        size={size}
        onChange={(e) => onChange?.(e.target.value)}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 200, 
              overflowY: "auto",
            },
          },
        }}
      >
        {options?.length
          ? options.map((option) => (
              <MenuItem value={option.value} key={option.value}>
                {option.label}
              </MenuItem>
            ))
          : null}
      </Select>

      {error && (
        <span className="text-red-500 text-sm block !mt-2">{error}</span>
      )}
    </div>
  );
};

export default ThecfhSelect;
