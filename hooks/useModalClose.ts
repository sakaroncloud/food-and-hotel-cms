"use client"

import { useEffect, useState } from "react"

type Props = {

    openModal: boolean,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>

    formName: string,
    formState: boolean,

}

export const useModalClose = (options: Props) => {
    console.log(options.formState, "formState")
    const [showExitConfirmation, setShowExitConfirmation] = useState(false)

    useEffect(() => {
        localStorage.setItem(options.formName, options.formState.toString())
    }, [options.formState])

    const handleOpenChange = () => {
        console.log(Date.now())
        const isUserFormModified = localStorage.getItem(options.formName)
        if (isUserFormModified) {
            if (isUserFormModified == "true") {
                console.log("true")
                if (options.openModal && showExitConfirmation) {
                    setShowExitConfirmation(false)
                    options.setOpenModal(false)
                    localStorage.removeItem(options.formName)
                }
                if (options.openModal && !showExitConfirmation) {
                    setShowExitConfirmation(true)
                }

                if (!open) {
                    localStorage.removeItem(options.formName)
                    options.setOpenModal(true)
                }
            }
            else {
                options.setOpenModal(false)
                setShowExitConfirmation(false)
                localStorage.removeItem(options.formName)
            }
        }
        else {
            options.setOpenModal(true)
        }
    }

    return {
        handleOpenChange,
        showExitConfirmation,
        setShowExitConfirmation
    }
}

