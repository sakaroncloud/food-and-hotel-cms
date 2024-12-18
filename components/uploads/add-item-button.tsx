import React, { Suspense } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Plus, Upload } from "lucide-react";
import Link from "next/link";
import { SearchQueryInput } from "./form/search-query.input";

type Props = {
    label: string;
    path?: string;
} & ButtonProps;

export const AddItemButton = ({ label, path, ...props }: Props) => {
    return (
        <Button
            {...props}
            className="rounded-3xl bg-primary  p-4 cursor-pointer"
            asChild
        >
            {path ? (
                <Link href={path || "/"} className="flex items-center gap-2 text-xs">
                    <Plus className="size-3" />
                    <span>{label}</span>
                </Link>
            ) : (
                <span className="flex items-center gap-2 text-xs">
                    <Plus className="size-3" />
                    <span>{label}</span>
                </span>
            )}
        </Button>
    );
};

export const HeaderActions = ({ label, path, ...props }: Props) => {
    return (
        <div className="flex gap-6 items-center">
            <AddItemButton label={label} path={path} {...props} />
        </div>
    );
};

export const HeaderActionsWithSearch = ({ label, path, ...props }: Props) => {
    return (
        <div className="flex gap-6 items-center">
            <Suspense fallback={<div>Loading...</div>}>
                <SearchQueryInput placeholder="Search..." />
            </Suspense>
            <Button variant="outline"  {...props} className="text-sm h-11">
                <Upload className="size-4" /> Upload
            </Button>
        </div>
    );
};