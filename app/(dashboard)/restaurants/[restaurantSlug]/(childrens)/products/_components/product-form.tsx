"use client"
import React, { useTransition } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Form } from '@/components/ui/form';
import { CustomFormField } from '@/components/form/custom-form-field';
import { productDefaultValues, productFormSchema, TProductForm } from '@/schemas/fooding/schema.product';
import { submitProduct } from '@/lib/actions/food/product.action';
import { TDefaultImage } from '@/lib/types/upload.type';
import { useRouter, } from 'next/navigation';
import { useFetch } from '@/hooks/useFetch';
import { API_ROUTES } from '@/lib/routes';
import { ResponseWithNoMeta } from '@/lib/types/response.type';
import { FormFieldWrapper, FormFooter } from '@/components/form/form-field-wrapper';
import { Restaurant } from '@/lib/types/restaurant.types';

type Props = {
    formValues?: TProductForm & {
        id: string,
    };
    restaurantSlug: string;
    defaultFeaturedImage?: TDefaultImage[];
}

export const ProductForm = ({ defaultFeaturedImage, formValues, restaurantSlug }: Props) => {

    const { data: menus } = useFetch<ResponseWithNoMeta<Restaurant.Menu.TMenusResponse>>({
        endPoint: API_ROUTES.menu.endpoint + "?restaurant=" + restaurantSlug,
        queryKey: API_ROUTES.menu.queryKey + restaurantSlug,
    });


    const form = useForm<TProductForm>({
        resolver: zodResolver(productFormSchema),
        defaultValues: formValues ? {
            ...formValues,
        } : {
            ...productDefaultValues,
            restaurant: restaurantSlug,
        }

    })

    const [isPending, startTransition] = useTransition();
    const router = useRouter()


    const onSubmit = (values: TProductForm) => {
        startTransition(async () => {
            const response = await submitProduct(values, formValues?.id);
            if (response.success == true) {
                toast.success(response.message)
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

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <FormFieldWrapper
                    description="Add your Products details here"
                    label="Product Details"
                    className="flex flex-col gap-6"
                >
                    <CustomFormField
                        elementName='input'
                        fieldId='name'
                        label='Name'
                        inputType='text'
                        placeholder='Enter product name'
                        className='w-full'
                    />

                    <CustomFormField
                        elementName='textarea'
                        fieldId='description'
                        label='Description'
                        inputType='text'
                        placeholder='Enter product description'
                        className='w-full'
                    />
                    <div className="grid grid-cols-2 gap-4">
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
                    </div>
                </FormFieldWrapper>



                <FormFieldWrapper
                    label="Choose Menu"
                    description="You can select multiple menus"
                    className="flex flex-col gap-6"
                >


                    <CustomFormField
                        elementName="multiselect"
                        fieldId="menus"
                        label="Menus"
                        placeholder="Describe a little about your cuisine"
                        className="w-full"
                        isMulti={true}
                        selectOptions={
                            menus?.data?.menus?.map((menu) => ({ value: menu.id, label: menu.name })) || []
                        }
                        defaultValue={
                            productDefaultValues.menus
                        }
                    />
                </FormFieldWrapper>


                <FormFieldWrapper
                    label="Choose Featured Image"
                    description="This image will be used in website"
                    className="flex flex-col gap-6"
                >
                    {/* <ChooseNewImageCard
                        fieldId={"featuredImage"}
                        label={"Featured Image"}
                        allowMultiple={false}
                        defaultImages={defaultFeaturedImage}
                    /> */}
                </FormFieldWrapper>
                <FormFooter
                    buttonLabel={formValues ? "Update" : "Add New"}
                    pending={isPending}
                />
            </form>
        </Form>


    )
}
