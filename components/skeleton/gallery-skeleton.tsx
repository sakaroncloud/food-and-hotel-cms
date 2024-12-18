import React from "react";
import { Skeleton } from "../ui/skeleton";

export const GallerySkeleton = () => {
    return (
        <div className="flex flex-wrap gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
                <Skeleton key={index} className="basis-[140px] h-40 shrink-0" />
            ))}
        </div>
    );
};