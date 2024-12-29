"use client"
import React, { useTransition } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Form } from '@/components/ui/form';
import { CustomFormField } from '@/components/form/custom-form-field';
import SubmitButton from '@/components/form/submit-button';
import { useRouter } from 'next/navigation';
import { AlertConfirmation } from '@/components/modals/alert-confirmation';
import { useModalClose } from '@/hooks/useModalClose';
import { menuDefaultValues, menuFormSchema, TMenuForm } from '@/schemas/fooding/schema.menu';
import { submitMenu } from '@/lib/actions/food/menu.action';

type Props = {
    formValues?: TMenuForm & {
        id: string,
    };
    restaurantSlug: string;
    label: string;
    formDescription?: string;
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MenuFormModal = ({ openModal, setOpenModal, formDescription, formValues, label, restaurantSlug }: Props) => {

    const form = useForm<TMenuForm>({
        resolver: zodResolver(menuFormSchema),
        defaultValues: formValues ? {
            ...formValues,
        } : {
            ...menuDefaultValues,
            restaurant: restaurantSlug,
        }

    })

    const { handleOpenChange, showExitConfirmation, setShowExitConfirmation } = useModalClose({
        openModal,
        setOpenModal,
        formName: "menuFormModified",
        formState: form.formState.isDirty
    })


    const [isPending, startTransition] = useTransition();
    const router = useRouter()

    const onSubmit = (values: TMenuForm) => {
        startTransition(async () => {
            const response = await submitMenu(values, formValues?.id);
            if (response.success == true) {
                toast.success(response.message)
                setOpenModal(false)
                router.refresh()
                if (!formValues) {
                    form.reset()
                }
            }
            else {
                toast.error(response.message || "Something went wrong")
            }
        })
    }
    return (
        <Dialog open={openModal} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[625px]">
                <AlertConfirmation
                    open={showExitConfirmation}
                    setOpen={setShowExitConfirmation}
                    confirmationAction={handleOpenChange}
                    message="You haven't saved your changes. Please confirm you want to exit without saving."
                />
                <DialogHeader>
                    <DialogTitle>
                        {label}
                    </DialogTitle>
                    {formDescription && (
                        <DialogDescription>
                            {formDescription}
                        </DialogDescription>
                    )}
                </DialogHeader>
                <Form {...form}>
                    <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
                        <CustomFormField
                            elementName='input'
                            fieldId='name'
                            label='Name'
                            inputType='text'
                            placeholder='Enter Menu name'
                            className='w-full'
                        />

                        <CustomFormField
                            elementName='textarea'
                            fieldId='description'
                            label='Menu Description'
                            placeholder='Please enter description'
                            className='w-full'
                        />
                        <SubmitButton type="submit" label={"Save changes"} pending={isPending} />
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}
