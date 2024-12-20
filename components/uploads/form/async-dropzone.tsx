"use client";
import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Upload } from "antd";
import { API_ROUTES } from "@/lib/routes";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { UploadHandler } from "@/lib/actions/action.upload";

const { Dragger } = Upload;

type Props = {
    setShowLibrary?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AsyncDropZone = ({ setShowLibrary }: Props) => {
    const [fileList, setFileList] = useState<any[]>([]);
    const queryClient = useQueryClient()

    const handleCustomRequest: UploadProps["customRequest"] = async ({
        file,
        onSuccess,
        onError,
    }: any) => {

        try {
            const formData = new FormData();
            formData.append("images", file as any); //

            const response = await UploadHandler(
                formData,
                API_ROUTES.restImage.endpoint,
            );

            if (response.statusCode == 201) {
                // Display success message
                toast.success(`Uploaded successfully.`);
                // Call `onSuccess` with a proper response
                onSuccess(response, file);
                // Update file list
                setFileList([]);
                queryClient.invalidateQueries({ queryKey: [API_ROUTES.restImage.queryKey] })

                // Optionally show the library if `setShowLibrary` exists
                if (setShowLibrary) {
                    setShowLibrary(true);
                }

            } else {
                // Handle server-side errors
                onError(new Error(response?.message || "Upload failed"));
                console.log(response)
                toast.error(response?.message?.[0] || `upload failed.`);
            }
        } catch (error) {
            // Handle client-side errors
            onError(error);
            toast.error(`Failed to upload . Please try again.`);
        }
    };

    const handleChange: UploadProps["onChange"] = (info) => {
        setFileList([...info.fileList]);
    };


    return (
        <div >
            <Dragger
                name="file"
                multiple={false}
                listType="picture-card"
                customRequest={handleCustomRequest}
                fileList={fileList}
                onChange={handleChange}
                className="w-full pb-4"
                onDrop={(e) => console.log("Dropped files", e.dataTransfer.files)}
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                    Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from uploading
                    company data or other banned files.
                </p>
            </Dragger>
        </div>
    );
};