"use client"
import React, { Suspense } from "react";
import { GalleryGrid } from "./gallery-grid";
import { GalleryUploadForm } from "./form/gallery-upload-form";

export const Gallery = () => {
    return (
        <div className="p-4 rounded-lg ">
            <Suspense fallback="">
                <GalleryUploadForm />
            </Suspense>

            <Suspense>
                <GalleryGrid />
            </Suspense>
        </div>
    );
};