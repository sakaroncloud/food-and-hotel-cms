"use client"
import React, { Suspense, use } from "react";
import { GalleryGrid } from "../gallery-grid";
import { FormFieldWrapper } from "../../form/form-field-wrapper";
import { AsyncDropZone } from "../form/async-dropzone";
import { useGalleryContext } from "@/components/providers/gallery-context";

type Props = {
    uploadEndPoint: string;
    fetchEndPoint: string;
    multiple?: boolean;
}

export const DropzoneAndMediaWrapper = ({ fetchEndPoint, uploadEndPoint, multiple }: Props) => {
    const { open } = useGalleryContext()
    return (
        <div className="p-4 rounded-lg ">
            {open && (
                <FormFieldWrapper description="Upload your image from here" label="Image">
                    <AsyncDropZone endPoint={uploadEndPoint} multiple={multiple} />
                </FormFieldWrapper>
            )}
            <Suspense>
                <GalleryGrid uploadEndPoint={uploadEndPoint}
                    fetchEndPoint={fetchEndPoint}
                />
            </Suspense>
        </div>
    );
};