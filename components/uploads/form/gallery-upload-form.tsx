"use client";

import { useCustomSearchParams } from "@/hooks/useCustomSearchParams";
import { AsyncDropZone } from "./async-dropzone";
import { FormFieldWrapper } from "@/components/form/form-field-wrapper";

export const GalleryUploadForm = () => {
    const { searchParams } = useCustomSearchParams();

    const isUpload = searchParams.get("upload") === "true";
    if (!isUpload) return null;
    return (
        <FormFieldWrapper description="Upload your image from here" label="Image">
            <AsyncDropZone />
        </FormFieldWrapper>
    );
};