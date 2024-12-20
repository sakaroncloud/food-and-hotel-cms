import { cn } from "@/lib/utils";
import React, { PropsWithChildren, Suspense } from "react";
type Props = {
    title: string;
    headerActions?: React.ReactNode;
    filterHeader?: React.ReactNode;
} & PropsWithChildren;

export const TableWrapperWithFilter = ({
    title,
    children,
    headerActions,
    filterHeader,
}: Props) => {
    return (
        <div className="space-y-6 relative">
            <div className=" w-full bg-white shadow border rounded-lg relative">
                <header
                    className={cn(
                        "flex justify-between items-center relative py-4 px-6",
                        filterHeader && "border-b border-dashed border-gray-200 pb-4"
                    )}
                >
                    <h1 className="text-lg font-medium tracking-wide text-gray-900">
                        {title}
                    </h1>
                    {headerActions}
                    <div className="absolute w-1 rounded-lg bg-primary h-[50%] top-1/2 -translate-y-1/2 left-0 -translate-x-1/2" />
                </header>

                {filterHeader && (
                    <div className="pt-4 py-4 px-6">
                        <Suspense fallback="loading">{filterHeader}</Suspense>
                    </div>
                )}
            </div>
            <div className="bg-white rounded-lg py-0 px-6">{children}</div>
        </div>
    );
};