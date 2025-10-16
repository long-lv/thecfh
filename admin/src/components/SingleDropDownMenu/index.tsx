import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import { ISingleDropDownProps } from "./type";
import dropDownIcon from "@/src/assets/images/dropdownicon.svg";
import checkedIcon from "@/src/assets/images/checkedIcon.svg";
import Image from "next/image";
const defaultValue = "Select option";
export default function SingleDropDownMenu(props: ISingleDropDownProps) {
  const {
    isMoreIcon = false,
    width,
    maxHeight,
    classWrap,
    classMenu,
    value = "",
    minWidthButton = "160px",
    options = [],
    onChangeValue,
  } = props;
  const [isOpen, setIsOpen] = useState<null | HTMLElement>(null);
  const [selectedValue, setSelectedValue] = useState<string>(value);
  const open = Boolean(isOpen);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setIsOpen(event.currentTarget);
  };

  const handleClose = () => {
    setIsOpen(null);
  };

  const onHandleClick = (val: string) => {
    onChangeValue(val);
    handleClose();
    setSelectedValue(val);
  };

  const getLabelByValue = () => {
    return (
      options.find((option) => {
        return option.value === selectedValue;
      })?.label || ""
    );
  };
  useEffect(() => {
    getLabelByValue();
  }, [selectedValue]);
  return (
    <div>
      {isMoreIcon ? (
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
      ) : (
        <button
          className="cursor-pointer border border-[var(--color-gray-border)] h-8 rounded-md flex items-center px-3 gap-1"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          style={{ minWidth: minWidthButton }}
        >
          <span className="text-sm ledding-[100%] text-[var(--color-black-1)]">
            {selectedValue ? getLabelByValue() : defaultValue}
          </span>
          <Image
            src={dropDownIcon}
            width={16}
            height={16}
            alt="drop-down-icon"
          ></Image>
        </button>
      )}
      <Menu
        className={`${
          classWrap ? classWrap : {}
        } !mt-1 rounded-md !px-0 !py-0`}
        anchorEl={isOpen}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            maxHeight: maxHeight,
            width: width ? width : minWidthButton,
            padding: 0,
            margin: 0,
            "& .MuiList-root": {
              padding: 0,
              margin: 0,
            },
          },
        }}
      >
        {options.map((option) => {
          return (
            <MenuItem
              key={option.value}
              onClick={() => onHandleClick(option.value)}
              className={`${
                classMenu ? classMenu : {}
              } px-3 py-2 !flex !justify-between hover:!bg-[var(--color-blue-cenematic-200)]`}
              style={{
                backgroundColor:
                  selectedValue === option.value
                    ? "var(--color-blue-cenematic-200)"
                    : "",
              }}
            >
              <span
                className="text-sm font-normal ledding-[140%] hover:!text-[var(--color-blue-cenematic)]"
                style={{
                  color:
                    selectedValue === option.value
                      ? "var(--color-blue-cenematic)"
                      : "var(--color-black-1)",
                }}
              >
                {option.label}
              </span>
              {selectedValue === option.value ? (
                <Image
                  src={checkedIcon}
                  width={16}
                  height={16}
                  alt="drop-down-icon"
                ></Image>
              ) : (
                <></>
              )}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
