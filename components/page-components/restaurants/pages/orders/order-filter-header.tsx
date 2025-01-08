"use client"
import { Skeleton } from "@/components/ui/skeleton";
import { OrderFilter } from "./order-filter";
import { OrderByDateGroup, OrderStatusDisplay } from "@/lib/types/order.types";
import { OrderFilterByDate } from "./order-filter-by-date";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { Suspense } from "react";
import { SearchQueryInput } from "@/components/uploads/form/search-query.input";
import { Label } from "@/components/ui/label";


export const OrderFilterHeader = () => {
    const pathname = usePathname()
    const router = useRouter()

    return (
        <div className="space-y-6 pb-4">
            <div className="grid  lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 w-full gap-4 items-end">

                <Suspense fallback={<Skeleton className="w-40 h-10 bg-gray-200" />}>
                    <div className="space-y-1">
                        <Label>Search by Customer name</Label>
                        <SearchQueryInput placeholder="Search by Customer name" />
                    </div>
                </Suspense>

                <OrderFilter
                    fieldId="status"
                    placeholder="By Order Status"
                    options={
                        Object.keys(OrderStatusDisplay).map((key) => ({
                            label: OrderStatusDisplay[key as keyof typeof OrderStatusDisplay],
                            value: key,
                        }))
                    }
                />


                <OrderFilter
                    fieldId="limit"
                    placeholder="Filter by limit"
                    options={Object.keys(OrderByDateGroup).map((key) => ({
                        label: OrderByDateGroup[key as keyof typeof OrderByDateGroup],
                        value: key,
                    }))}
                />

                <Button size={"lg"} onClick={() => router.replace(pathname)}>
                    Download
                </Button>


            </div>
            <div className="shrink-0 w-full grid grid-cols-4 gap-4 items-end">
                <OrderFilterByDate fieldId="from" label="Start Date" />
                <OrderFilterByDate fieldId="to" label="End Date" />
                <Button size={"lg"} onClick={() => router.replace(pathname)}>
                    Reset
                </Button>
            </div>
        </div>
    );
};

export const OrderFilterSkeleton = () => {
    return (
        <div className="max-w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow">
            <div className="grid grid-cols-2 w-full gap-x-6">
                <div className="">
                    <Skeleton className="h-2.5 bg-gray-200 w-24 mb-2.5 rounded-full" />
                    <Skeleton className="w-full h-6 bg-gray-100 rounded-full " />
                </div>

                <div className="">
                    <Skeleton className="h-2.5 bg-gray-200 w-24 mb-2.5 rounded-full" />
                    <Skeleton className="w-full h-6 bg-gray-100 rounded-full " />
                </div>
            </div>
        </div>
    );
};