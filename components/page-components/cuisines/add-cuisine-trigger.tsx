"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CuisineForm } from "./cuisine-form"
import { useState } from "react"
import { AlertConfirmation } from "@/components/modals/alert-confirmation"

export function AddCuisineTrigger() {
    const [showExitConfirmation, setShowExitConfirmation] = useState(false)
    const [open, setOpen] = useState(false)


    const handleOpenChange = () => {
        const isUserFormModified = localStorage.getItem("userFormModified")
        if (isUserFormModified) {
            if (isUserFormModified == "true") {
                if (open && showExitConfirmation) {
                    setShowExitConfirmation(false)
                    setOpen(false)
                    localStorage.removeItem("userFormModified")
                }
                if (open && !showExitConfirmation) {
                    setShowExitConfirmation(true)
                }

                if (!open) {
                    localStorage.removeItem("userFormModified")
                    setOpen(true)
                }
            }
            else {
                setOpen(false)
                setShowExitConfirmation(false)
                localStorage.removeItem("userFormModified")
            }
        }
        else {
            setOpen(true)
        }
    }



    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" size={"icon"}>+</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <AlertConfirmation
                    open={showExitConfirmation}
                    setOpen={setShowExitConfirmation}
                    confirmationAction={handleOpenChange}
                    message="You haven't saved your changes. Please confirm you want to exit without saving."
                />
                <DialogHeader>
                    <DialogTitle>Add New Cuisine</DialogTitle>
                    <DialogDescription>
                        Add your new cuisine here
                    </DialogDescription>
                </DialogHeader>
                <CuisineForm />
            </DialogContent>
        </Dialog>
    )
}
