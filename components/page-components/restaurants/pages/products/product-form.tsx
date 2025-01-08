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
import { GalleryForm } from '@/components/choose-image-card/gallery-form';
import { getIDsFromSlug } from '@/lib/utils/utils';

type Props = {
    formValues?: TProductForm;
    productId?: string | number;
    restaurantSlug: string;
    defaultImages?: {
        bannerImage?: TDefaultImage;
    }
}

export const ProductForm = ({ defaultImages, formValues, productId, restaurantSlug }: Props) => {

    const { restaurantId } = getIDsFromSlug({
        restaurantSlug
    })

    console.log(formValues)

    const { data: menus } = useFetch<ResponseWithNoMeta<Restaurant.Menu.TMenusResponse>>({
        endPoint: API_ROUTES.menu.endpoint + "?restaurantId=" + restaurantId,
        queryKey: API_ROUTES.menu.queryKey + restaurantId,
    });


    const form = useForm<TProductForm>({
        resolver: zodResolver(productFormSchema),
        defaultValues: formValues || {
            ...productDefaultValues,
            restaurantId: parseInt(`${restaurantId}`)
        }

    })

    const [isPending, startTransition] = useTransition();
    const router = useRouter()
    const onSubmit = (values: TProductForm) => {
        startTransition(async () => {
            const response = await submitProduct(values, productId);
            if (response.success == true) {
                toast.success(response.message)
                router.refresh()
                if (!formValues) {
                    router.push(`/restaurants/${restaurantSlug}/products`)
                    form.reset()
                }
            }
            else {
                toast.error(response.message || "Something went wrong")
            }
        })
    }

    console.log(form.formState.errors, "errors")

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
                            step={"any"}
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
                            menus?.data?.menus?.map((menu) => ({ value: `${menu.id}`, label: menu.name })) || []
                        }
                        defaultValue={
                            formValues?.menus || productDefaultValues.menus
                        }
                    />
                </FormFieldWrapper>


                <FormFieldWrapper
                    label="Choose Featured Image"
                    description="This image will be used in website"
                    className="flex flex-col gap-6"
                >
                    <GalleryForm
                        defaultImages={defaultImages?.bannerImage?.id ? [defaultImages.bannerImage] : []}
                        allowMultiple={false}
                        fieldId={"bannerImage"}
                        label={"Banner Image"}
                        fetchEndPoint={API_ROUTES.singleRestImage.endpoint + "/" + restaurantId}
                        uploadEndPoint={API_ROUTES.singleRestImage.endpoint + "/" + restaurantId}
                    />
                </FormFieldWrapper>
                <FormFooter
                    buttonLabel={formValues ? "Update" : "Add New"}
                    pending={isPending}
                />
            </form>
        </Form>


    )
}
