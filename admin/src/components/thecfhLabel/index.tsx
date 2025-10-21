import IPropsTheCfhLabel from "./type";

export default function ThecfhLabel(props: IPropsTheCfhLabel) {
  const { label = "", required = false, className, style } = props;
  return (
    <label
      className={`${className} ? ${className} : ''`}
      style={{ ...style }}
    >
      {label}
			<span className="!ml-1 text-[var(--color-red-60)]">{required ? '*' : "" }</span>
    </label>
  );
}
