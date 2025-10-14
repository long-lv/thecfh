import { IPropsThecfhButton } from "./type";

const ThecfhButton = (props: IPropsThecfhButton) => {
  const { label, width, height, className, style, disabled, classNameLabel, styleLabel, onClick } = props;
  return (
    <button
      className={`${className || ""} 
        ${disabled ? "opacity-50 hover:brightness-100" : "hover:brightness-95 cursor-pointer"}
        border
        border-[var(--color-gray-border-200)]
      `}
      style={{ ...style, width, height }}
      disabled={disabled}
      onClick={onClick}
    >
      <span className={classNameLabel || ""} style={styleLabel || {}}>{label}</span>
    </button>
  );
};

export default ThecfhButton;
