"use client";
import React, { PropsWithChildren } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
    customButton: React.ReactNode;
    title: string;
    description?: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
} & PropsWithChildren;

export const CustomFormModal = ({
    customButton,
    title,
    description,
    open,
    setOpen,
    children,
}: Props) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{customButton}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
};