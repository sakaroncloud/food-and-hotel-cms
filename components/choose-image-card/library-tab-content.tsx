import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from "@tanstack/react-query";
import Image from "next/image";
import { useFormContext } from "react-hook-form";

import { ChooseImageLoadMoreBtn } from "./choose-image-load-more-btn";
import { ChooseImageDialogClose } from "./dialog-close";
import { TAsyncGallery } from "@/lib/types/upload.type";
import { cn } from "@/lib/utils/utils";
import { BACKEND_URL } from "@/lib/constants";
import FallbackImage from "../fallback-image";

type LibraryProps = {
    gallery: TAsyncGallery,
    allowMultiple: boolean | undefined;
    fieldId: string;
    label: string;
    value: string | string[],
    hasNextPage: boolean | undefined,
    isFetchingNextPage: boolean,
    fetchNextPage: (options?: FetchNextPageOptions) => Promise<InfiniteQueryObserverResult<InfiniteData<any, unknown>, Error>>

}
export const LibraryContent = ({ gallery, allowMultiple, fieldId, value, hasNextPage, isFetchingNextPage, fetchNextPage, label }: LibraryProps) => {
    const form = useFormContext()
    return (
        <div className="w-full">
            <div className="flex flex-wrap gap-4">
                {gallery?.map((image) => {
                    return (
                        <div
                            key={image.id}
                            className="relative h-40 basis-[140px]  shrink-0 cursor-pointer "
                            onClick={() => {
                                if (allowMultiple) {

                                    const currentValues: string[] = form.getValues(fieldId) || []; // Get current values or initialize as an empty array
                                    const newValue: string[] = currentValues.includes(image.id)
                                        ? currentValues.filter(
                                            (id: string) => id !== image.id
                                        ) // Remove item if it exists
                                        : [...currentValues, image.id]; // Add item if it does not exist

                                    form.setValue(fieldId, newValue);
                                } else {

                                    const currentValue: string = form.getValues(fieldId) || ""
                                    if (currentValue === image.id) {
                                        form.setValue(fieldId, undefined)
                                    }
                                    else {
                                        const currentValue = form.getValues(fieldId) || ""
                                        if (currentValue === image.id) {
                                            form.setValue(fieldId, undefined)
                                        }
                                        else {
                                            form.setValue(fieldId, image.id);
                                        }
                                    }

                                }
                            }}
                        >
                            <FallbackImage
                                type="square"
                                src={image.url}
                                alt={image.originalName}
                                width={200}
                                height={200}
                                className="rounded object-cover size-[140px] border-2"
                            />
                            <div
                                className={cn(
                                    "absolute inset-0 size-[140px] flex p-1 items-end bg-gray-100/10 group  hover:border-blue-500 border-2 border-transparent rounded transition-all  ease-in",
                                    !allowMultiple &&
                                    value === image.id &&
                                    "border-blue-500 border-4",
                                    allowMultiple && Array.isArray(value) &&
                                    value
                                        ?.map((id: string) => id === image.id)
                                        .includes(true) &&
                                    "border-blue-500 border-4"
                                )}
                            >
                                <span className="inline-block text-[10px] text-white line-clamp-1 bg-primary rounded-xl px-2 py-1 ">
                                    {image.originalName}
                                </span>
                            </div>
                        </div>
                    );
                })}


            </div>

            <div className="flex items-center justify-between gap-4 w-full">

                <ChooseImageDialogClose
                    label={label}
                    value={value}
                />


                <ChooseImageLoadMoreBtn
                    hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage}
                    fetchNextPage={fetchNextPage}
                />

            </div>

        </div>
    )
}