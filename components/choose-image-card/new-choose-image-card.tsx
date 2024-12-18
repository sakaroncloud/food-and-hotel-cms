"use client"

import { useLoadMoreFetch } from "@/hooks/useFetch";
import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircleIcon, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


import Image from "next/image";
import { ErrorMessage } from "@hookform/error-message";
import { LibraryContent } from "./library-tab-content";
import { Button } from "../ui/button";
import { AsyncDropZone } from "../uploads/form/async-dropzone";
import { TAsyncGallery, TDefaultImage } from "@/lib/types/upload.type";
import { BACKEND_URL } from "@/lib/constants";



type Props = {
    fieldId: string;
    label: string;
    imageURL?: string;
    allowMultiple: boolean | undefined;
    defaultImages?: TDefaultImage[] | undefined
};
export const ChooseNewImageCard = (
    {
        fieldId,
        label,
        allowMultiple,
        defaultImages
    }: Props
) => {

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useLoadMoreFetch({
            pageParam: 1,
            endPoint: "/restaurant-image",
            queryKey: `restaurantImages`,
            take: 10,
        });

    const gallery: TAsyncGallery = useMemo(() => data?.pages?.flatMap((page) => page?.data).filter(Boolean) ?? [], [data]);


    const form = useFormContext();
    const [showLibrary, setShowLibrary] = useState(false);
    const value = form.watch(fieldId);
    return (
        <div className="space-y-2">
            <Dialog>
                <DialogTrigger asChild>
                    {/* If value is not empty - no matter either from server or local */}
                    {value && value?.length > 0 ? (
                        allowMultiple ? (
                            // If multiple images are allowed
                            <div className="flex flex-wrap gap-4">
                                {value?.map((imageId: string, index: number) => {
                                    const image = gallery?.find(
                                        (image) => image?.id === imageId
                                    ) || defaultImages?.find((image) => image?.id === imageId);

                                    if (image?.url) {
                                        return (
                                            <div className="w-fit relative" key={index}>
                                                <Image
                                                    src={BACKEND_URL + "/" + image.url}
                                                    alt="image"
                                                    height={200}
                                                    width={200}
                                                    className="rounded object-cover max-h-[160px] w-auto"
                                                />
                                                <div className="absolute inset-0 hover:bg-gray-800/20 transition-all group duration-300 ease-in h-full w-full cursor-pointer flex items-center justify-center">
                                                    <PlusCircleIcon className="text-white size-8 invisible group-hover:visible transition-all duration-300 ease-in opacity-0 group-hover:opacity-100" />
                                                </div>
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        ) : (
                            // for single image
                            <div className="w-fit relative">
                                <Image
                                    src={
                                        BACKEND_URL + "/" + (gallery?.find((image) => image?.id === value)?.url ||
                                            defaultImages?.find((image) => image?.id === value)?.url || "/")
                                    }
                                    alt="image"
                                    height={200}
                                    width={200}
                                    className="rounded object-cover max-h-[160px] w-auto"
                                />
                                <div className="absolute inset-0 hover:bg-gray-800/20 transition-all group duration-300 ease-in h-full w-full cursor-pointer flex items-center justify-center">
                                    <PlusCircleIcon className="text-white size-8 invisible group-hover:visible transition-all duration-300 ease-in opacity-0 group-hover:opacity-100" />
                                </div>
                            </div>
                        )
                    ) : (
                        <Button type="button" variant="outline" className="space-x-3">
                            Choose Image
                        </Button>
                    )}
                </DialogTrigger>
                <DialogContent className="max-w-[96vw] h-[96vh] w-full flex flex-col justify-between overflow-y-scroll">
                    <DialogHeader>
                        <DialogTitle className="flex justify-between items-center border-b pb-3 h-10">
                            {label}
                            <DialogClose>
                                <X className="text-black" />
                            </DialogClose>
                        </DialogTitle>
                    </DialogHeader>

                    <div className="w-full flex-1 flex justify-between  h-[(calc(96vh-80px))] overflow-y-auto">
                        <Tabs
                            onValueChange={(e) => {
                                setShowLibrary(e === "library");
                            }}
                            value={showLibrary ? "library" : "upload"}
                            className="w-full"
                        >
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="upload">Upload</TabsTrigger>
                                <TabsTrigger value="library">Media Library</TabsTrigger>
                            </TabsList>
                            <TabsContent value="upload">
                                {/* Upload Content */}
                                <AsyncDropZone setShowLibrary={setShowLibrary} />
                            </TabsContent>
                            <TabsContent value="library">


                                <LibraryContent
                                    label={label} gallery={gallery} fieldId={fieldId} value={value}
                                    hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage}
                                    fetchNextPage={fetchNextPage}
                                    allowMultiple={allowMultiple}
                                />
                            </TabsContent>
                        </Tabs>
                    </div>
                </DialogContent>
            </Dialog>
            <ErrorMessage
                errors={form.formState.errors}
                name={fieldId}
                render={({ message }) => (
                    <p className="text-[0.8rem] font-medium text-destructive">
                        {message}
                    </p>
                )}
            />
        </div>
    )
}


