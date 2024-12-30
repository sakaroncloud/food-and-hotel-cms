"use client"

import { CustomFormField } from "@/components/form/custom-form-field"
import { FormFieldWrapper, FormFooter } from "@/components/form/form-field-wrapper"
import { Form } from "@/components/ui/form"
import { submitProperty } from "@/lib/actions/lodging/action.property"
import { languagesOptions, propertyBasicDefaultValues, propertyBasicFormSchema, TPropertyBasicForm } from "@/schemas/lodging/property/property-basic.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type Props = {
    setActiveTab?: React.Dispatch<React.SetStateAction<number>>;
    formValues?: TPropertyBasicForm & { id: string, slug: string };
}

export const PropertyBasicForm = ({ formValues }: Props) => {
    const router = useRouter()
    const form = useForm<TPropertyBasicForm>({
        resolver: zodResolver(propertyBasicFormSchema),
        defaultValues: formValues ? {
            ...formValues,

        } : propertyBasicDefaultValues
    })

    const [isPending, startTransition] = useTransition();

    const onSubmit = (values: TPropertyBasicForm) => {
        startTransition(async () => {
            const response = await submitProperty(values, formValues?.id);
            if (response.success == true) {
                toast.success(response.message)
                if (!formValues) {
                    router.push(`/properties/${response.data.slug}/edit`)
                }
                // TODO: if successfull, redirect to property edit page - to submit others details
            }
            else {
                toast.error(response.message || "Something went wrong")
            }
        })
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                {/* Name - Description - Commission */}
                <FormFieldWrapper
                    description="Add your property details here (Hotel, Apartment, House, etc)"
                    label="Property Details"
                    className="flex flex-col gap-6"
                >
                    <CustomFormField
                        elementName="input"
                        fieldId="name"
                        label="Property Name"
                        inputType="text"
                        placeholder="Enter Property Name"
                        className="w-full"
                    />
                    <CustomFormField
                        elementName="textarea"
                        fieldId="description"
                        label="Description"
                        placeholder="Describe a little about your property (hotel)"
                        className="w-full"
                    />

                    <CustomFormField
                        elementName="input"
                        fieldId="commissionPercentage"
                        label="Commission Percentage"
                        inputType="number"
                        placeholder="Enter Commission Percentage"
                        className="w-full"
                    />
                </FormFieldWrapper>
                {/* Languages */}
                <FormFieldWrapper
                    description="Please select multiple languages that are spoken in the property"
                    label="Languages"
                    className="flex flex-col gap-6"
                >
                    <CustomFormField
                        elementName="multiselect"
                        fieldId="languages"
                        label="Languages"
                        placeholder="Select multiple languages that are spoken in the property"
                        className="w-full"
                        isMulti={true}
                        selectOptions={
                            languagesOptions
                        }
                    />
                </FormFieldWrapper>

                {/* Contact Details */}
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
                    {/* Contact Information */}
                </FormFieldWrapper>

                {/* Check-in and Check-out */}
                <FormFieldWrapper
                    label="Check-in and Check-out"
                    description="Fill out check-in and check-out time"
                >
                    <div className="grid grid-cols-3 gap-6">
                        <CustomFormField
                            elementName="timepicker"
                            fieldId="checkInStartTime"
                            label="Check-in Start Time"
                            placeholder="Select time when check-in begins"
                            className="flex flex-col"
                        />
                        <CustomFormField
                            elementName="timepicker"
                            fieldId="checkInEndTime"
                            label="Check-in End Time"
                            placeholder="Select time when check-in ends"
                            className="flex flex-col"
                        />
                        <CustomFormField
                            elementName="timepicker"
                            fieldId="checkOutTime"
                            label="Check-outTime"
                            placeholder="Select checkout time"
                            className="flex flex-col"
                        />
                    </div>
                </FormFieldWrapper>

                <FormFooter
                    buttonLabel={formValues ? "Update" : "Add New"}
                    pending={isPending}
                    goBack={{
                        path: `/properties`
                    }}
                />
            </form>
        </Form>
    )
}
