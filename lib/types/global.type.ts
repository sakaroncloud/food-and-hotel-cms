import { LucideIcon } from "lucide-react";
import { ClassNameValue } from "tailwind-merge";

export type TBreadCrumb = {
    label: string;
    link?: string;
}

export type CardItemProps = {
    value: string | number;
    label: string;
    Icon: LucideIcon;
    iconColor: ClassNameValue;
    link?: string;
}