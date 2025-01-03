import { LucideIcon } from "lucide-react";
import { ClassNameValue } from "tailwind-merge";

export type TCardLabel = {
    label: string;
    link?: string;
}

export type TBreadCrumb = TCardLabel

export type CardItemProps = TCardLabel & {
    value: string | number;
    Icon: LucideIcon;
    iconColor: ClassNameValue;
}

type TSlug = "propertySlug" | "roomSlug" | "restaurantSlug" | "citySlug"

export type TParams = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
    params: Promise<Record<TSlug, string>>;
}

