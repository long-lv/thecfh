import { Drawer } from "@mui/material";
import { IPropsTheCfhDrawer } from "./type";

export default function TheCfhDrawer(props: IPropsTheCfhDrawer) {
  const {
    isOpen,
    className,
    style,
    position = "right",
    children,
    width = "400px",
    onClose,
  } = props;
  return (
      <Drawer
        open={isOpen}
        onClose={onClose}
        PaperProps={{
          className: className || "",
          sx: {
            width,
            ...style,
          },
        }}
        anchor={position}
      >
        {children}
      </Drawer>
  );
}
