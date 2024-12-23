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
import { TAddressForm } from '@/schemas/schema.address';
import { useFetch } from '@/hooks/useFetch';
import { ResponseWithNoMeta, TProduct } from '@/lib/types/response.type';
import { API_ROUTES, } from '@/lib/routes';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Form } from '@/components/ui/form';
import { CustomFormField } from '@/components/form/custom-form-field';
import SubmitButton from '@/components/form/submit-button';
import { productDefaultValues, productFormSchema, TProductForm } from '@/schemas/fooding/schema.product';
import { submitProduct } from '@/lib/actions/product.action';
import { ChooseNewImageCard } from '@/components/choose-image-card/new-choose-image-card';
import { TDefaultImage } from '@/lib/types/upload.type';

type Props = {
    formValues?: TProductForm & {
        id: string,
    };
    restaurantSlug: string;
    label: string;
    formDescription?: string;
    isRestaurantVeg: boolean;
    children: React.ReactNode;
    defaultFeaturedImage?: TDefaultImage[];
}

export const ProductFormModal = ({ children, defaultFeaturedImage, formDescription, formValues, label, isRestaurantVeg, restaurantSlug }: Props) => {

    console.log(defaultFeaturedImage)

    const [open, setOpen] = useState(false)

    const form = useForm<TProductForm>({
        resolver: zodResolver(productFormSchema),
        defaultValues: formValues ? {
            ...formValues,
        } : {
            ...productDefaultValues,
            restaurant: restaurantSlug,
            isPureVeg: isRestaurantVeg
        }

    })

    const [isPending, startTransition] = useTransition();
    const queryClient = useQueryClient()

    const onSubmit = (values: TProductForm) => {
        startTransition(async () => {
            const response = await submitProduct(values, formValues?.id);
            if (response.success == true) {
                toast.success(response.message)
                setOpen(false)
                form.reset()

                if (formValues) {
                    queryClient.invalidateQueries({ queryKey: [API_ROUTES.product.queryKey + restaurantSlug] })
                }


                if (!formValues) {
                    queryClient.invalidateQueries({ queryKey: [API_ROUTES.product.queryKey + restaurantSlug] })
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
                {children}
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
                            elementName='input'
                            fieldId='price'
                            label='Price'
                            inputType='number'
                            placeholder='Enter Price'
                            className='w-full'
                        />



                        <CustomFormField
                            elementName='input'
                            fieldId='preparationTime'
                            label='Preparation Time (in minutes)'
                            inputType='number'
                            placeholder='eg: 30'
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
                            defaultImages={defaultFeaturedImage}
                        />
                        <SubmitButton type="submit" label={"Save changes"} pending={isPending} />
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}
