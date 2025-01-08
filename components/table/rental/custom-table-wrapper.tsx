"use client"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/utils";
import { FilterTwoTone } from "@ant-design/icons";
import { Filter } from "lucide-react";
import React, { PropsWithChildren, Suspense, useState } from "react";
type Props = {
    title: string;
    headerActions?: React.ReactNode;
    filterHeader?: React.ReactNode;
} & PropsWithChildren;

export const CustomTableWrapper = ({
    title,
    children,
    headerActions,
    filterHeader,
}: Props) => {
    const [showFilter, setShowFilter] = useState(true)
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
                    <div className="flex-1 flex items-center justify-end">
                        {headerActions}

                        <Button variant={"outline"} className="text-sm"
                            onClick={() => setShowFilter(!showFilter)}
                        >
                            {
                                showFilter ? "Hide" : "Show"
                            } Filter <Filter />
                        </Button>
                    </div>
                    <div className="absolute w-1 rounded-lg bg-primary h-[50%] top-1/2 -translate-y-1/2 left-0 -translate-x-1/2" />
                </header>

                {filterHeader && showFilter && (
                    <div className="pt-4 py-4 px-6">
                        <Suspense fallback="loading">{filterHeader}</Suspense>
                    </div>
                )}
            </div>
            <div className="bg-white rounded-lg py-4 px-6">{children}</div>
        </div>
    );
};