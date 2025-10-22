import { IPropsThecfhButton } from "./type";

const ThecfhButton = (props: IPropsThecfhButton) => {
  const { label, width, height, className, style, disabled, classNameLabel, styleLabel, onClick } = props;
  return (
    <button
      className={`${className || ""} 
        ${disabled ? "opacity-50 hover:brightness-100" : "hover:brightness-95 cursor-pointer"}
        border
        border-[var(--color-gray-border-200)]
				px-5 py-2 rounded bg-[var(--color-button-primary-active)] text-white
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
