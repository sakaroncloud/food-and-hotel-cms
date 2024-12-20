"use client";
import React, { useEffect, useMemo } from "react";

import { Button } from "@/components/ui/button";
import { UploadImageCard } from "./image-card";
import { useCustomSearchParams } from "@/hooks/useCustomSearchParams";
import { useLoadMoreFetch } from "@/hooks/useFetch";
import { GallerySkeleton } from "../skeleton/gallery-skeleton";
import { API_ROUTES } from "@/lib/routes";

export const GalleryGrid = () => {
    const { searchParams } = useCustomSearchParams()
    const searchkey = searchParams.get("search")

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching, refetch } =
        useLoadMoreFetch({
            pageParam: 1,
            endPoint: API_ROUTES.restImage.endpoint,
            queryKey: API_ROUTES.restImage.queryKey,
            take: 5,
            imageName: searchkey || ""
        });

    const allImages = useMemo(() => data?.pages?.flatMap((page) => page?.data).filter(Boolean) ?? [], [data]);

    return (
        <div className="flex flex-wrap gap-4">
            {allImages?.map((image) => (

                <UploadImageCard key={image.id} image={image} />
            ))}

            {isFetching && (
                <div className="w-full">
                    <GallerySkeleton />
                </div>
            )}

            <div className="flex items-center justify-start w-full">
                {hasNextPage !== undefined && hasNextPage && (
                    <Button
                        type="button"
                        variant={"outline"}
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        size={"lg"}
                        className="border-primary text-primary w-40"
                    >
                        {isFetchingNextPage
                            ? "Loading more..."
                            : hasNextPage
                                ? "Load More"
                                : "No more images"}
                    </Button>
                )}
            </div>
        </div>
    );
};