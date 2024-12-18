"use client";
import { Input } from "@/components/ui/input";
import { useCustomSearchParams } from "@/hooks/useCustomSearchParams";
import { debounce } from "lodash";

type Props = {
    className?: string;
    placeholder: string;
};

export const SearchQueryInput = ({ className, placeholder }: Props) => {
    const { createQueryString, searchParams, deleteQueryString } =
        useCustomSearchParams();

    const handleChangeQuery = debounce((e: any) => {
        createQueryString("search", e.target.value);
        if (e.target.value.length == 0) {
            deleteQueryString("search");
        }
    }, 100);

    return (

        <Input
            className="max-w-xs"
            placeholder={placeholder}
            onChange={handleChangeQuery}
            defaultValue={searchParams.get("search") || ""}
        />

    );
};