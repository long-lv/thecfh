import { ReactNode } from "react";

export interface IPropsThecfhTooltip {
    title: string | ReactNode;
    description: string;
    className?: string;
    style?: React.CSSProperties;
}