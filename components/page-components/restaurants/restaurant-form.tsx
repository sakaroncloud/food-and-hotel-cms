"use client"

import { ChooseNewImageCard } from "@/components/choose-image-card/new-choose-image-card"
import { CustomFormField } from "@/components/form/custom-form-field"
import { FormFieldWrapper, FormFooter } from "@/components/form/form-field-wrapper"
import { Form } from "@/components/ui/form"
import { useFetch } from "@/hooks/useFetch"
import { submitRestaurant } from "@/lib/actions/action.restaurant"
import { API_ROUTES } from "@/lib/routes"
import { ResponseWithMeta, TCuisine } from "@/lib/types/response.type"
import { TDefaultImage } from "@/lib/types/upload.type"
import { discountTypeOptions, restaurantDefaultValues, restaurantFormSchema, TRestaurantForm, weekDaysOptions } from "@/schemas/fooding/schema.restaurant"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type Props = {
    formValues?: TRestaurantForm & { id: string, slug: string };
    defaultLogo?: TDefaultImage[];
    defaultFeaturedImage?: TDefaultImage[];
}

export const RestaurantForm = ({ defaultFeaturedImage, defaultLogo, formValues }: Props) => {
    const { data: cuisines } = useFetch<ResponseWithMeta<TCuisine[]>>({
        endPoint: API_ROUTES.cuisine.endpoint + "?skipPagination=true",
        queryKey: API_ROUTES.cuisine.queryKey,
    });

    const router = useRouter()
    const form = useForm<TRestaurantForm>({
        resolver: zodResolver(restaurantFormSchema),
        defaultValues: formValues ? {
            ...formValues,

        } : restaurantDefaultValues
    })

    const [isPending, startTransition] = useTransition();
    const queryClient = useQueryClient()
    const onSubmit = (values: TRestaurantForm) => {
        startTransition(async () => {
            const response = await submitRestaurant(values, formValues?.id);
            if (response.success == true) {
                toast.success(response.message)

                if (formValues) {
                    queryClient.invalidateQueries({ queryKey: [API_ROUTES.restaurant.queryKey, formValues.slug] })
                }
                if (!formValues) {
                    router.push(response.data.slug)
                    queryClient.invalidateQueries({ queryKey: [API_ROUTES.restaurant.queryKey] })
                }
            }
            else {
                toast.error(response.message || "Something went wrong")
            }
        })
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <FormFieldWrapper
                    description="Add your cuisine details here"
                    label="Restaurant Details"
                    className="flex flex-col gap-6"
                >
                    <CustomFormField
                        elementName="input"
                        fieldId="name"
                        label="Restaurant Name"
                        inputType="text"
                        placeholder="Enter Restaurant Name"
                        className="w-full"
                    />
                    <CustomFormField
                        elementName="textarea"
                        fieldId="description"
                        label="Description"
                        placeholder="Describe a little about your cuisine"
                        className="w-full"
                        defaultValue={restaurantDefaultValues.cuisines}
                    />

                    <CustomFormField
                        elementName="input"
                        fieldId="commissionPercentage"
                        label="Commission Percentage"
                        inputType="number"
                        placeholder="Enter Commission Percentage"
                        className="w-full"
                    />

                    <CustomFormField
                        elementName="checkbox"
                        fieldId="isPureVeg"
                        label="Do this restaurant serve pure vegetarian food ?"
                        placeholder="Please make sure while enabling this, non-veg cannot be added in Pure Veg Restaurant"
                        className="w-full"
                    />




                </FormFieldWrapper>

                <FormFieldWrapper
                    label="Availability"
                    description="Fill the details about your service availability"
                >

                    <div className="grid grid-cols-2 gap-6">
                        <CustomFormField
                            elementName="checkbox"
                            fieldId="isEnabled"
                            label="Is restaurant service open ?"
                            placeholder="Only enabled restaurant can be served"
                            className="w-full"
                        />
                        <CustomFormField
                            elementName="multiselect"
                            fieldId="dayOfWeek"
                            label="Day of week"
                            placeholder="Select days where service is not available"
                            className="w-full"
                            isMulti={true}
                            selectOptions={
                                weekDaysOptions
                            }
                        />

                        <CustomFormField
                            elementName="timepicker"
                            fieldId="openingTime"
                            label="Opening Time"
                            placeholder="Select time when service is available"
                            className="flex flex-col"

                        />
                        <CustomFormField
                            elementName="timepicker"
                            fieldId="closingTime"
                            label="Closing Time"
                            placeholder="Select time when service is unavailable"
                            className="flex flex-col"

                        />
                    </div>
                </FormFieldWrapper>

                <FormFieldWrapper
                    description="Enter the phone, email, and address"
                    label="Contact Details"
                >
                    <div className="grid grid-cols-2 gap-6 w-full">
                        <CustomFormField
                            elementName="input"
                            fieldId="email"
                            label="Email"
                            inputType="email"
                            placeholder="Enter Email"
                            className="w-full"
                        />

                        <CustomFormField
                            elementName="input"
                            fieldId="phone"
                            label="Phone Number"
                            inputType="phone"
                            className="w-full"
                        />
                    </div>
                </FormFieldWrapper>

                {/* ----------- Featured Image ------- */}

                <FormFieldWrapper
                    description="Choose Restaurant Featured Image"
                    label="Featured Image"
                    className="flex flex-col gap-6"
                >

                    <ChooseNewImageCard
                        fieldId={"featuredImage"}
                        label={"Featured Image"}
                        allowMultiple={false}
                        defaultImages={defaultFeaturedImage}
                    />

                </FormFieldWrapper>

                {/* ----------- Logo ------- */}
                <FormFieldWrapper
                    description="Choose Restaurant Logo"
                    label="Logo"
                    className="flex flex-col gap-6"
                >

                    <ChooseNewImageCard
                        fieldId={"logo"}
                        label={"Logo"}
                        allowMultiple={false}
                        defaultImages={defaultLogo}
                    />

                </FormFieldWrapper>

                <FormFieldWrapper description="Choose Restaurant Cuisines" label="Cuisines" className="flex flex-col gap-6">
                    <CustomFormField
                        elementName="multiselect"
                        fieldId="cuisines"
                        label="Cuisines"
                        placeholder="Describe a little about your cuisine"
                        className="w-full"
                        isMulti={true}
                        selectOptions={
                            cuisines?.data?.map((cuisine) => ({ value: cuisine.id, label: cuisine.name })) || []
                        }
                        defaultValue={
                            restaurantDefaultValues.cuisines
                        }
                    />
                </FormFieldWrapper>


                {/* ---------------- Global Offer --------- */}
                <FormFieldWrapper
                    description="Offer listed here will be implemented to all products across the restaurant"
                    label="Global offers"
                    className="flex flex-col gap-6"
                >
                    <div className="flex flex-wrap gap-6">
                        <CustomFormField
                            elementName="input"
                            fieldId="hasGlobalOffer.heading"
                            label="Offer Heading"
                            inputType="text"
                            placeholder="eg: 13% off"

                        />

                        <CustomFormField
                            elementName="input"
                            fieldId="hasGlobalOffer.subHeading"
                            label="Offer Subheading"
                            inputType="text"
                            placeholder="eg: upto Rs 50"
                        />

                        <CustomFormField
                            elementName="input"
                            fieldId="hasGlobalOffer.actualValue"
                            label="Actual Discount"
                            inputType="number"
                            placeholder="eg: 13"
                        />
                        <CustomFormField
                            elementName="input"
                            fieldId="hasGlobalOffer.maxUpTo"
                            label="Maximum Discount Amount"
                            inputType="number"
                            placeholder="eg: 13"
                        />
                        <CustomFormField
                            elementName="radio"
                            fieldId="hasGlobalOffer.type"
                            label="Discount Type"
                            placeholder="percentage"
                            className="w-full"
                            selectOptions={discountTypeOptions}
                        />
                    </div>
                </FormFieldWrapper>

                <FormFooter
                    buttonLabel={formValues ? "Update" : "Add New"}
                    pending={isPending}
                    goBack={{
                        path: "/cuisines"
                    }}
                />
            </form>
        </Form>
    )
}
