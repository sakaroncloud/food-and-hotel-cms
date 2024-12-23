import React, { useState, useTransition } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { PlusIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { API_ROUTES, } from '@/lib/routes';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Form } from '@/components/ui/form';
import { CustomFormField } from '@/components/form/custom-form-field';
import SubmitButton from '@/components/form/submit-button';
import { ChooseNewImageCard } from '@/components/choose-image-card/new-choose-image-card';
import { menuDefaultValues, menuFormSchema, TMenuForm } from '@/schemas/fooding/schema.menu';
import { submitMenu } from '@/lib/actions/menu.action';

type Props = {
    formValues?: TMenuForm & { id: string };
    restaurantSlug: string;
    restaurantId: string;
    label: string;
    formDescription?: string;
    isPureVeg: boolean;
}

export const MenuFormModal = ({ formDescription, formValues, label, isPureVeg, restaurantId, restaurantSlug }: Props) => {

    const [open, setOpen] = useState(false)

    const form = useForm<TMenuForm>({
        resolver: zodResolver(menuFormSchema),
        defaultValues: formValues ? {
            ...formValues,
            restaurant: restaurantId
        } : {
            ...menuDefaultValues,
            restaurant: restaurantId,
            isPureVeg: isPureVeg
        }

    })

    const [isPending, startTransition] = useTransition();
    const queryClient = useQueryClient()

    const onSubmit = (values: TMenuForm) => {
        startTransition(async () => {
            const response = await submitMenu(values, formValues?.id);
            if (response.success == true) {
                toast.success(response.message)
                setOpen(false)
                form.reset()

                if (formValues) {
                    queryClient.invalidateQueries({ queryKey: [API_ROUTES.restaurant.queryKey, restaurantSlug] })
                }


                if (!formValues) {
                    queryClient.invalidateQueries({ queryKey: [API_ROUTES.restaurant.queryKey, restaurantSlug] })
                }
            }
            else {
                toast.error(response.message || "Something went wrong")
            }
        })
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size={"icon"} variant={"ghost"} className="bg-primary/80 hover:bg-primary p-1 rounded-full "><PlusIcon className='text-white size-5' /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
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
                            placeholder='Enter product name'
                            className='w-full'
                        />

                        <CustomFormField
                            elementName="checkbox"
                            fieldId="isPureVeg"
                            label="Check if product is pure veg"
                            className="w-full"
                        />

                        <ChooseNewImageCard
                            fieldId={"featuredImage"}
                            label={"Featured Image"}
                            allowMultiple={false}
                        />
                        <SubmitButton type="submit" label={"Save changes"} pending={isPending} />
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}
