"use client";
import { Input } from "@/components/ui/input";
import { useCustomSearchParams } from "@/hooks/useCustomSearchParams";
import { debounce } from "lodash";
import { Search } from "lucide-react";

type Props = {
    className?: string;
    placeholder: string;
};

export const CuisineSearchForm = ({ className, placeholder }: Props) => {
    const { createQueryString, searchParams, deleteQueryString } =
        useCustomSearchParams();

    const handleChangeQuery = debounce((e: any) => {
        createQueryString("search", e.target.value);
        if (e.target.value.length == 0) {
            deleteQueryString("search");
        }
    }, 100);

    return (
        <div className="px-3 py-1 border border-slate-200 rounded-lg flex items-center gap-2 max-w-[400px] w-full">
            <Search />
            <Input
                className="border-0 shadow-none focus:border-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none px-0 border-none"
                placeholder={placeholder}
                onChange={handleChangeQuery}
                defaultValue={searchParams.get("search") || ""}
            />
        </div>
    );
};