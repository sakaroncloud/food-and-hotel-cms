"use client";
import { AddItemButton } from "./add-item-button";
import { useGalleryContext } from "../providers/gallery-context";

export const DropzoneTriggerer = () => {
    const { open, setOpen } = useGalleryContext()
    return (
        <AddItemButton label={
            open ? "Close" : "Upload"
        } onClick={() => setOpen(!open)} />
    );
};