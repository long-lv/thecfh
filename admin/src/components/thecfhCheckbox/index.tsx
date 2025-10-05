import Checkbox from "@mui/material/Checkbox";
import { IPropsThecfhCheckbox } from "./type";

export const ThecfhCheckbox = (props: IPropsThecfhCheckbox) => {
  const {
    value,
    className,
    style,
    disabled,
    size = "small",
    onChange,
  } = props;
  return (
    <Checkbox
      value={value}
      size={size}
      className={className}
      style={style}
      disabled={disabled}
      onChange={(e) => onChange(e.target.checked)}
    />
  );
};
