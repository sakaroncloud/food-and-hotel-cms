
import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

type Props = {
    title: string;
    headerClassName?: string;
} & PropsWithChildren;

export const CreatePageWrapper = ({
    headerClassName,
    title,
    children,
}: Props) => {
    return (
        <div className="space-y-3 px-4">
            <header
                className={cn(
                    "py-6 flex items-center border-b border-dashed  border-gray-300",
                    headerClassName
                )}
            >
                <h1 className="text-xl font-medium">{title}</h1>
            </header>
            <div>{children}</div>
        </div>
    );
};