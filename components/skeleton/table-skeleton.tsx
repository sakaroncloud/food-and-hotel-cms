import React from "react";
import { Skeleton } from "../ui/skeleton";

export const TableSkeleton = () => {
    return (
        <div className="max-w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow  ">
            <div className="flex items-center justify-between">
                <div>
                    <Skeleton className="h-2.5 bg-gray-300 w-24 mb-2.5 rounded-full" />
                    <Skeleton className="w-32 h-2 bg-gray-200 rounded-full " />
                </div>

                <Skeleton className="h-2.5  rounded-full  w-12" />
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <Skeleton className="h-2.5 bg-gray-300 w-24 mb-2.5 rounded-full" />
                    <Skeleton className="w-32 h-2 bg-gray-200 rounded-full " />
                </div>
                <Skeleton className="h-2.5  rounded-full  w-12" />
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <Skeleton className="h-2.5 bg-gray-300 w-24 mb-2.5 rounded-full" />
                    <Skeleton className="w-32 h-2 bg-gray-200 rounded-full " />
                </div>
                <Skeleton className="h-2.5  rounded-full  w-12" />
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <Skeleton className="h-2.5 bg-gray-300 w-24 mb-2.5 rounded-full" />
                    <Skeleton className="w-32 h-2 bg-gray-200 rounded-full " />
                </div>
                <Skeleton className="h-2.5  rounded-full  w-12" />
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <Skeleton className="h-2.5 bg-gray-300 w-24 mb-2.5 rounded-full" />
                    <Skeleton className="w-32 h-2 bg-gray-200 rounded-full " />
                </div>
                <Skeleton className="h-2.5  rounded-full  w-12" />
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    );
};