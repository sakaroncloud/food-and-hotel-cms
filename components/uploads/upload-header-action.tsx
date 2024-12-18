"use client";
import { useCustomSearchParams } from "@/hooks/useCustomSearchParams";
import { Suspense } from "react";
import { HeaderActionsWithSearch } from "./add-item-button";

export const UploadHeaderAction = () => {
    const { createQueryString, deleteQueryString, searchParams } =
        useCustomSearchParams();

    const handleChange = () => {
        const currentValue = searchParams.get("upload");
        if (!currentValue) {
            createQueryString("upload", "true");
        } else {
            deleteQueryString("upload");
        }
    };

    return (
        <HeaderActionsWithSearch label="Upload" onClick={() => handleChange()} />
    );
};

export const UploadHeaderActionWrapper = () => {
    return (
        <Suspense fallback={<>Loading</>}>
            <UploadHeaderAction />
        </Suspense>
    );
};