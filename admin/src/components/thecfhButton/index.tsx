import { IPropsThecfhButton } from "./type";

const ThecfhButton = (props: IPropsThecfhButton) => {
  const { label, width, height, className, style, disabled, onClick } = props;
  return (
    <button
      className={`${className || ""} 
        cursor-pointer
        rounded-md 
        border
        border-[var(--color-gray-border-200)]
      `}
      style={{ ...style, width, height }}
      disabled={disabled}
      onClick={onClick}
    >
      <span>{label}</span>
    </button>
  );
};

export default ThecfhButton;
