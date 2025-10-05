import Tooltip from "@mui/material/Tooltip";
import { IPropsThecfhTooltip } from "./type";
import styles from "./style.module.css";
/**
 * Render CommonTooltip component
 * @param props IPropsThecfhTooltip
 * @returns JSX.Element
 */
export default function ThecfhTooltip({
  title,
  description,
  className,
  style,
}: IPropsThecfhTooltip) {
  return (
    <Tooltip
      title={description}
      className={`${styles.tooltip} ${className || ""}`}
      style={{
        ...(style || {}),
      }}
      placement="top"
      arrow
      componentsProps={{
        tooltip: {
          sx: {
            backgroundColor: 'var(--color-text-1)',
            color: 'var(--color-white)',
            fontSize: '14px',
            '& .MuiTooltip-arrow': {
              color: 'var(--color-text-1)',
            },
          },
        },
      }}
    >
      <div style={{ width: "fit-content" }}>{title}</div>
    </Tooltip>
  );
}
