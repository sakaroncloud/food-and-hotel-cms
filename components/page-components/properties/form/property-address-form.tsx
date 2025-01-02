"use client"
import React, { useTransition } from 'react'


import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addressDefaultValues, addressFormSchema, TAddressForm } from '@/schemas/schema.address';
import { useFetch } from '@/hooks/useFetch';
import { ResponseWithNoMeta } from '@/lib/types/response.type';
import { API_ROUTES } from '@/lib/routes';
import { submitAddress } from '@/lib/actions/action.address';
import toast from 'react-hot-toast';
import { TCity } from '@/lib/types/address.types';
import { Form } from '@/components/ui/form';
import { CustomFormField } from '@/components/form/custom-form-field';
import { FormFieldWrapper, FormFooter } from '@/components/form/form-field-wrapper';


type Props = {
    propertyId: string;
    formValues?: TAddressForm;
}

export const PropertyAddressForm = ({ propertyId, formValues }: Props) => {

    const { data: cities } = useFetch<ResponseWithNoMeta<TCity[]>>({
        endPoint: API_ROUTES.city.endpoint,
        queryKey: API_ROUTES.city.queryKey,
    });

    const form = useForm<TAddressForm>({
        resolver: zodResolver(addressFormSchema),
        defaultValues: formValues || addressDefaultValues
    })


    const [isPending, startTransition] = useTransition();


    const onSubmit = (values: TAddressForm) => {
        startTransition(async () => {
            const response = await submitAddress(values, API_ROUTES.property.endpoint + "/" + propertyId + "/address");
            if (response.success == true) {
                toast.success(response.message)
            }
            else {
                toast.error(response.message || "Something went wrong")
            }
        })
    }

    console.log(form.formState.errors)

    return (


        <Form {...form}>
            <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
                <FormFieldWrapper
                    description='Add your address details here'
                    label='Address Details'

                >
                    <CustomFormField
                        elementName='input'
                        fieldId='streetOne'
                        label='Street One'
                        inputType='text'
                        placeholder='Enter Street One'
                        className='w-full'
                    />
                    <CustomFormField
                        elementName='input'
                        fieldId='area'
                        label='Area'
                        inputType='text'
                        placeholder='Enter Area'
                        className='w-full'
                    />

                    <CustomFormField
                        elementName='input'
                        fieldId='buildingName'
                        label='Building Name'
                        inputType='text'
                        placeholder='Enter Building Name'
                        className='w-full'
                    />
                    <CustomFormField
                        elementName='input'
                        fieldId='mapLink'
                        label='Map Link'
                        inputType='text'
                        placeholder='Enter Map Link'
                        className='w-full'
                    />
                    <CustomFormField
                        elementName='select'
                        fieldId='city'
                        label='City'
                        placeholder='Select City'
                        className='w-full'
                        selectOptions={cities?.data?.map((city) => ({ value: city.id, label: city.name })) || []}
                    />
                </FormFieldWrapper>
                <FormFooter
                    buttonLabel="Update"
                    pending={isPending}
                    goBack={{
                        path: `/properties`
                    }}
                />

            </form>
        </Form >


    )
}
