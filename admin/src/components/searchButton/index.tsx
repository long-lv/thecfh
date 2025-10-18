import { IPropsSeachButton } from "./type";
import searchIcon from "@/src/assets/images/search_icon.svg";
import Image from "next/image";

export default function SearchButton(props: IPropsSeachButton) {
  const { className, style, onClick } = props;
  return (
    <button
      onClick={onClick}
      className={`${
        className ? className : ""
      } w-8 h-[35px] flex justify-center items-center border rounded-lg border-[var(--color-gray-border-200)] cursor-pointer`}
      style={{
        ...style,
      }}
    >
      <Image
        src={searchIcon}
        width={16}
        height={16}
        alt="button-search"
      ></Image>
    </button>
  );
}
