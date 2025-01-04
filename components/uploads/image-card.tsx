"use client";
import React, { useState, useTransition } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import { formatDate } from "@/lib/utils/utils";
import { formatFileSize } from "@/lib/utils/utils";
import SubmitButton from "../form/submit-button";
import { CustomAlertDialog } from "./form/custom-alert-dialog";
import { TAsyncImage } from "@/lib/types/upload.type";
import { CustomFormField } from "../form/custom-form-field";
import { imageNameSchema, TImageName } from "@/schemas/fooding/schema.restImage";
import { updateImageName } from "@/lib/actions/action.upload";
import { deleteHandler } from "@/lib/actions/global.action";
import toast from "react-hot-toast";
import { InfiniteData, QueryObserverResult, RefetchOptions, useQueryClient } from "@tanstack/react-query";
import FallbackImage from "../fallback-image";

type Props = {
    image: TAsyncImage;
    uploadEndPoint: string;
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<InfiniteData<any, unknown>, Error>>
};

export const UploadImageCard = ({ uploadEndPoint, image, refetch }: Props) => {
    const uploadedDate = formatDate(image.createdAt, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    const [isPending, startTransition] = useTransition();

    const queryClient = useQueryClient()

    const [deleteModal, setDeleteModal] = useState(false)
    const [open, setOpen] = useState(false)

    const form = useForm<TImageName>({
        resolver: zodResolver(imageNameSchema),
        defaultValues: {
            originalName: image.originalName,
        },
    });

    const onSubmit = async (values: TImageName) => {
        startTransition(async () => {
            const res = await updateImageName({
                formData: values,
                endPoint: uploadEndPoint + "/image",
                param: image.id
            })
            if (res.success == true) {
                toast.success(res.message)
                console.log(Date.now())
                queryClient.invalidateQueries()
                refetch()
                setOpen(false)
            }
            else {
                toast.error(res.message)
            }
        });
    };

    const onDelete = async () => {
        startTransition(async () => {
            const res = await deleteHandler({
                ENDPOINT: uploadEndPoint + "/image",
                PARAM: image.id
            })
            if (res.success == true) {
                toast.success(res.message)
                refetch()
                queryClient.invalidateQueries()
                setOpen(false)
            }
            else {
                toast.error(res.message)
                setOpen(false)
            }
            queryClient.invalidateQueries()
            setDeleteModal(false)
        });

    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="relative h-[140px] basis-[140px]  shrink-0 rounded-xl overflow-hidden group transition-all duration-300 ease-out cursor-pointer">
                    <FallbackImage
                        type="square"
                        src={image.url}
                        alt={"test"}
                        width={200}
                        height={200}
                        className="rounded object-cover size-[140px] border-2 group-hover:scale-105 transition-all duration-300 ease-out"
                    />
                    <div className="absolute inset-0 w-full h-full invisible group-hover:visible opacity-0 transition-all duration-300 ease-out group-hover:opacity-100 bg-black/40  flex items-center justify-center p-2">
                        <span className="text-white text-xs font-medium line-clamp-1">
                            {image.originalName}
                        </span>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-[96vw] h-[96vh] w-full flex flex-col justify-between overflow-y-scroll">
                <div className="flex justify-between items-center border-b pb-3 h-10 w-full">
                    <DialogHeader className="">
                        <DialogTitle className="w-fit">Attachment details</DialogTitle>

                    </DialogHeader>

                </div>
                <div className="w-full flex-1 flex justify-between  h-[(calc(96vh-80px))] overflow-y-auto">
                    <div className="h-full w-8/12 flex justify-center">
                        <FallbackImage
                            type="square"
                            src={image.url}
                            alt={"test"}
                            width={1200}
                            height={1200}
                            quality={100}
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCACNAF4DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCgKlSohUqVsyidKlFRLUgqGA6mtTqQ0gIWqJqmYVGwoAiNApxFAFMAFOpAKdQIripVqMU9apjJ1qQVCpqVTUMCSkNAp2KQyMimFamxSFaBFcrSbanK00rTER4oxTsUYpiKopwptOFNlEqmpVqBalWoYyZaeBTFqVRUjDFG2ngUu2mIhK0wrVgrTGWqJZARTcVKRTMUySjSikpRSZoPWpkqFamSoYyZKnUVCgqwgpDHgU7FKop2KZJEVqNhVgio2FUiWV2FMIqZhUZFUQZdKKbTxUmw9anQVCoqwgqQJoxVhBUMYqwgpASKKfikUU6mIYRUbCpjUbVRLIGFRkVMwqMimSYoqRaiBqVKk3JkFWIxUUYqzGKRJKgqdBUaCplFMkeKdSCloAaajapDTGpiImplSGm0COeU1Yjqqh5q1FSOiSLUYq1GKgiFWoxTMWSoKlUUxRUgpk3FoopCaBiGmGnE0w0gGmkpxpKQHMRnmrsNZ8Jya0IO1B0zReiFW4xVaIVbjFUczJFFPpFFOpkiGmGnGmGgBCaaaCaSpZSCiilqSjkrc81pwVl2/wB6tS3qjoqGhDVuOqkNXI6aOVkopaQUpqiBpqM1I1RtQCGGig0lQzRC0tIKWoKP/9k="
                            className="rounded object-contain w-auto max-h-[calc(100%-40px)] border-1 shadow-md p-4 max-w-full"
                        />
                    </div>
                    <div className="col-span-6 w-4/12 bg-slate-50 p-4">
                        <div className="space-y-2 pb-4 border-b border-slate-200">
                            <div>
                                <Label className="text-sm font-medium text-gray-600 mr-2">
                                    Uploaded On : {uploadedDate}
                                </Label>{" "}
                                <span className="text-xs font-light"></span>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-gray-600 mr-2">
                                    Uploaded By :
                                </Label>
                                <span className="text-xs font-light">
                                    {image?.uploadedBy?.firstName} {image?.uploadedBy?.lastName}
                                </span>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-gray-600 mr-2">
                                    File name :
                                </Label>
                                <span className="text-xs font-light">{image?.originalName}</span>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-gray-600 mr-2">
                                    File type :
                                </Label>{" "}
                                <span className="text-xs font-light">{image?.memeType} </span>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-gray-600 mr-2">
                                    File Size :
                                </Label>{" "}
                                <span className="text-xs font-light">
                                    {formatFileSize(image?.size)}
                                </span>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-gray-600 mr-2">
                                    Dimension :
                                </Label>{" "}
                                <span className="text-xs font-light">
                                    {image?.width} x {image?.height}
                                </span>
                            </div>
                        </div>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                <Table>
                                    <TableBody>
                                        <TableRow className="border-0">
                                            <TableCell className="font-medium">Title </TableCell>
                                            <TableCell>
                                                <CustomFormField
                                                    elementName="input"
                                                    fieldId="originalName"
                                                    showError={true}
                                                />
                                            </TableCell>
                                        </TableRow>

                                        <TableRow className="border-0">
                                            <TableCell className="font-medium">File Url </TableCell>
                                            <TableCell>
                                                <div className="min-h-9 flex items-center px-3 py-1 text-sm border border-input rounded-md shadow-sm ">
                                                    {image.url}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>

                                <div className="flex gap-3">
                                    <CustomAlertDialog disabled={isPending} onClick={onDelete} pending={isPending}
                                        open={deleteModal}
                                        setOpen={setDeleteModal}
                                    />
                                    <SubmitButton
                                        type="submit"
                                        pending={isPending}

                                        label="Update Name"
                                    />
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};




