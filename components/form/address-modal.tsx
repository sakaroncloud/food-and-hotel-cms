import React, { useTransition } from 'react'



import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { MapPin } from 'lucide-react';
import { Form } from '../ui/form';
import { CustomFormField } from './custom-form-field';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addressDefaultValues, addressFormSchema, TAddressForm } from '@/schemas/schema.address';
import { useFetch } from '@/hooks/useFetch';
import { ResponseWithNoMeta, TCity } from '@/lib/types/response.type';
import { API_ROUTES, authRoutes } from '@/lib/routes';
import { useQueryClient } from '@tanstack/react-query';
import { submitAddress } from '@/lib/actions/action.address';
import toast from 'react-hot-toast';
import { TRestaurantForm } from '@/schemas/fooding/schema.restaurant';
import { useRouter } from 'next/navigation';
import SubmitButton from './submit-button';

type Props = {
    ENDPOINT: string;
    label: string;
    formValues?: TAddressForm;
    queryKeyOne: string;
    queryKeyTwo: string;

}

export const AddressFormModal = ({ ENDPOINT, formValues, label, queryKeyOne, queryKeyTwo }: Props) => {

    const { data: cities } = useFetch<ResponseWithNoMeta<TCity[]>>({
        endPoint: API_ROUTES.city.endpoint,
        queryKey: API_ROUTES.city.queryKey,
    });

    const router = useRouter()

    const form = useForm<TAddressForm>({
        resolver: zodResolver(addressFormSchema),
        defaultValues: formValues || addressDefaultValues
    })

    const [isPending, startTransition] = useTransition();
    const queryClient = useQueryClient()

    const onSubmit = (values: TAddressForm) => {
        startTransition(async () => {
            const response = await submitAddress(values, ENDPOINT);
            if (response.success == true) {
                toast.success(response.message)

                if (formValues) {
                    queryClient.invalidateQueries({ queryKey: [queryKeyOne, queryKeyTwo] })
                }
                if (!formValues) {
                    router.back()
                    queryClient.invalidateQueries({ queryKey: [queryKeyOne, queryKeyTwo] })
                }
            }
            else {
                toast.error(response.message || "Something went wrong")
            }
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"sm"} className='text-xs' variant={"outline"}>
                    <MapPin className='size-3 mr-2' />
                    {label}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
                        <div className='grid grid-cols-2 gap-6'>
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
                                fieldId='floor'
                                label='Floor'
                                inputType='text'
                                placeholder='Enter Floor'
                                className='w-full'
                            />

                        </div>
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
                        <SubmitButton type="submit" label={"Save changes"} pending={isPending} />

                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}
