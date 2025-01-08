import { Skeleton } from "@/components/ui/skeleton";
import { SearchQueryInput } from "@/components/uploads/form/search-query.input";
import React, { Suspense } from "react";

export const OrdersHeaderActions = () => {
    return (
        <div className="flex gap-6 items-center w-full justify-end">
            <Suspense fallback={<Skeleton className="w-40 h-10 bg-gray-200" />}>
                <SearchQueryInput placeholder="Search by Customer name" />
            </Suspense>
        </div>
    );
};