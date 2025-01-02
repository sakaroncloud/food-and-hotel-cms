import { CustomFormField, DynamicTagField } from '@/components/form/custom-form-field';
import { FormFieldWrapper, FormFooter } from '@/components/form/form-field-wrapper';
import { Form, } from '@/components/ui/form';
import { submitPropertyAmenities } from '@/lib/actions/lodging/action.property';
import { propertyAmenitiesClientSchema, propertyAmenitiesDefaultValues, TPropertyAmenitiesClientForm } from '@/schemas/lodging/property/property-amenities.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useTransition } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type Props = {
    formValues?: TPropertyAmenitiesClientForm | null;
    id: string;
    slug: string;
}

export const PropertyAmenityForm = ({ id, formValues }: Props) => {
    const form = useForm<TPropertyAmenitiesClientForm>({
        resolver: zodResolver(propertyAmenitiesClientSchema),
        defaultValues: formValues ? {
            ...formValues,

        } : propertyAmenitiesDefaultValues
    })

    const [isPending, startTransition] = useTransition();


    const onSubmit = (values: TPropertyAmenitiesClientForm) => {
        startTransition(async () => {
            const response = await submitPropertyAmenities(values, id);
            if (response.success == true) {

                toast.success(response.message)
                if (!formValues) {

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
                <FormFieldWrapper
                    description='Select all the general amenities that are available'
                    label='General Amenities'
                    className='flex justify-between flex-1 '
                >

                    {/*frontDesk  */}
                    <div className='w-full flex justify-between gap-4'>
                        <CustomFormField
                            elementName='checkbox'
                            fieldId='general.frontDesk.status'
                            label='Front Desk'
                            placeholder='Check if front desk or receiption is available'
                            className='w-full  shadow-none'
                        />
                        <CustomFormField
                            elementName='input'
                            fieldId='general.frontDesk.description'
                            className='w-full'
                            label='Write short note'
                        />
                    </div>


                    {/*wifi  */}
                    <div className='w-full flex justify-between gap-4'>
                        <CustomFormField
                            elementName='checkbox'
                            fieldId='general.wifi.status'
                            label='Wi-Fi'
                            placeholder='Check if wifi is available'
                            className='w-full  shadow-none'
                        />
                        <CustomFormField
                            elementName='input'
                            fieldId='general.wifi.description'
                            className='w-full'
                            label='Write short note'
                        />
                    </div>


                    {/*gym  */}
                    <div className='w-full flex justify-between gap-4'>
                        <CustomFormField
                            elementName='checkbox'
                            fieldId='general.gym.status'
                            label='Gym'
                            placeholder='Check if gym is available'
                            className='w-full  shadow-none'
                        />
                        <CustomFormField
                            elementName='input'
                            fieldId='general.gym.description'
                            className='w-full'
                            label='Write short note'
                        />
                    </div>

                    {/*laundry  */}
                    <div className='w-full flex justify-between gap-4'>
                        <CustomFormField
                            elementName='checkbox'
                            fieldId='general.laundry.status'
                            label='Laundry'
                            placeholder='Check if laundry is available'
                            className='w-full  shadow-none'
                        />
                        <CustomFormField
                            elementName='input'
                            fieldId='general.laundry.description'
                            className='w-full'
                            label='Write short note'
                        />
                    </div>

                    {/*spa  */}
                    <div className='w-full flex justify-between gap-4'>
                        <CustomFormField
                            elementName='checkbox'
                            fieldId='general.spa.status'
                            label='Spa'
                            placeholder='Check if spa is available'
                            className='w-full  shadow-none'
                        />
                        <CustomFormField
                            elementName='input'
                            fieldId='general.spa.description'
                            className='w-full'
                            label='Write short note'
                        />
                    </div>

                    {/*pool  */}
                    <div className='w-full flex justify-between gap-4'>
                        <CustomFormField
                            elementName='checkbox'
                            fieldId='general.pool.status'
                            label='Swimming Pool'
                            placeholder='Check if swimming pool is available'
                            className='w-full  shadow-none'
                        />
                        <CustomFormField
                            elementName='input'
                            fieldId='general.pool.description'
                            className='w-full'
                            label='Write short note'
                        />
                    </div>

                    {/*dining  */}
                    <div className='w-full flex justify-between gap-4'>
                        <CustomFormField
                            elementName='checkbox'
                            fieldId='general.dining.status'
                            label='Dining'
                            placeholder='Is Dining available ?'
                            className='w-full  shadow-none'
                        />
                        <CustomFormField
                            elementName='input'
                            fieldId='general.dining.description'
                            className='w-full'
                            label='Write short note'
                        />
                    </div>
                    <DynamicTagField
                        fieldId='general.others'
                        defaultTags={formValues?.general?.others}
                        placeholder='Hey, what else you want to add?'
                        label='Others (Hit Enter to add)'
                        className='w-full'
                    />
                </FormFieldWrapper>
                <FormFieldWrapper
                    description='Select all the kids/family related amenities that are available'
                    label='Kids/Family Amenities'
                    className='flex justify-between flex-1 '
                >

                    {/*kidsAndFamily  */}
                    <div className='w-full flex justify-between gap-4'>
                        <CustomFormField
                            elementName='checkbox'
                            fieldId='kidsAndFamily.childFriendly.status'
                            label='Child Friendly'
                            placeholder='Is Child Friendly?'
                            className='w-full  shadow-none'
                        />
                        <CustomFormField
                            elementName='input'
                            fieldId='kidsAndFamily.childFriendly.description'
                            className='w-full'
                            label='Write short note'
                        />
                    </div>

                    <div className='w-full flex justify-between gap-4'>
                        <CustomFormField
                            elementName='checkbox'
                            fieldId='kidsAndFamily.familyFriendly.status'
                            label='Family Friendly'
                            placeholder='Is family Friendly?'
                            className='w-full  shadow-none'
                        />
                        <CustomFormField
                            elementName='input'
                            fieldId='kidsAndFamily.familyFriendly.description'
                            className='w-full'
                            label='Write short note'
                        />


                    </div>

                    <div className='w-full flex justify-between gap-4'>
                        <CustomFormField
                            elementName='checkbox'
                            fieldId='kidsAndFamily.babyChange.status'
                            label='Baby Change'
                            placeholder='Do have baby change?'
                            className='w-full  shadow-none'
                        />
                        <CustomFormField
                            elementName='input'
                            fieldId='kidsAndFamily.babyChange.description'
                            className='w-full'
                            label='Write short note'
                        />
                    </div>

                    <DynamicTagField
                        fieldId='kidsAndFamily.others'
                        defaultTags={formValues?.kidsAndFamily?.others}
                        placeholder='Hey, what else you want to add?'
                        label='Others (Hit Enter to add)'
                        className='w-full'
                    />

                </FormFieldWrapper>

                {/* Accessibility */}

                <FormFieldWrapper
                    description='Select all the accessibilities related amenities that are available'
                    label='Accessibilities'
                    className='flex justify-between flex-1 '
                >
                    {/*elevator  */}
                    <div className='w-full flex justify-between gap-4'>
                        <CustomFormField
                            elementName='checkbox'
                            fieldId='accessibility.elevator.status'
                            label='Elevator'
                            placeholder='Have elevator?'
                            className='w-full  shadow-none'
                        />
                        <CustomFormField
                            elementName='input'
                            fieldId='accessibility.elevator.description'
                            className='w-full'
                            label='Write short note'
                        />
                    </div>

                    {/*carParking  */}
                    <div className='w-full flex justify-between gap-4'>
                        <CustomFormField
                            elementName='checkbox'
                            fieldId='accessibility.carParking.status'
                            label='Car Parking'
                            placeholder='Have carParking?'
                            className='w-full  shadow-none'
                        />
                        <CustomFormField
                            elementName='input'
                            fieldId='accessibility.carParking.description'
                            className='w-full'
                            label='Write short note'
                        />
                    </div>

                    {/*wheelChair  */}
                    <div className='w-full flex justify-between gap-4'>
                        <CustomFormField
                            elementName='checkbox'
                            fieldId='accessibility.wheelChair.status'
                            label='Wheel Chair'
                            placeholder='Wheel Chair Friendly?'
                            className='w-full  shadow-none'
                        />
                        <CustomFormField
                            elementName='input'
                            fieldId='accessibility.wheelChair.description'
                            className='w-full'
                            label='Write short note'
                        />
                    </div>

                    {/* stroller  */}
                    <div className='w-full flex justify-between gap-4'>
                        <CustomFormField
                            elementName='checkbox'
                            fieldId='accessibility.stroller.status'
                            label='Stroller'
                            placeholder='Stroller Friendly?'
                            className='w-full  shadow-none'
                        />
                        <CustomFormField
                            elementName='input'
                            fieldId='accessibility.stroller.description'
                            className='w-full'
                            label='Write short note'
                        />
                    </div>

                    <DynamicTagField
                        fieldId='accessibility.others'
                        defaultTags={formValues?.accessibility?.others}
                        placeholder='Hey, what else you want to add?'
                        label='Others (Hit Enter to add)'
                        className='w-full'
                    />

                </FormFieldWrapper>

                {/* Safety */}

                <FormFieldWrapper
                    description='Select all the safety related amenities that are available'
                    label='Safety'
                    className='flex justify-between flex-1 '
                >
                    {/*Security Guards  */}
                    <div className='w-full flex justify-between gap-4'>
                        <CustomFormField
                            elementName='checkbox'
                            fieldId='safety.securityGuards.status'
                            label='Security Personnel'
                            placeholder='Have Security Personnel?'
                            className='w-full  shadow-none'
                        />
                        <CustomFormField
                            elementName='input'
                            fieldId='safety.securityGuards.description'
                            className='w-full'
                            label='Write short note'
                        />
                    </div>

                    {/*SmokeAlarm  */}
                    <div className='w-full flex justify-between gap-4'>
                        <CustomFormField
                            elementName='checkbox'
                            fieldId='safety.smokeAlarm.status'
                            label='Smoke Alarm'
                            placeholder='Have Smoke Alarm?'
                            className='w-full  shadow-none'
                        />
                        <CustomFormField
                            elementName='input'
                            fieldId='safety.smokeAlarm.description'
                            className='w-full'
                            label='Write short note'
                        />
                    </div>

                    {/*cctv  */}
                    <div className='w-full flex justify-between gap-4'>
                        <CustomFormField
                            elementName='checkbox'
                            fieldId='safety.cctv.status'
                            label='CCTV'
                            placeholder='Have CCTV?'
                            className='w-full  shadow-none'
                        />
                        <CustomFormField
                            elementName='input'
                            fieldId='safety.cctv.description'
                            className='w-full'
                            label='Write short note'
                        />
                    </div>

                    {/*emergencyExit  */}
                    <div className='w-full flex justify-between gap-4'>
                        <CustomFormField
                            elementName='checkbox'
                            fieldId='safety.emergencyExit.status'
                            label='Emergency Exit'
                            placeholder='Have Emergency Exit?'
                            className='w-full  shadow-none'
                        />
                        <CustomFormField
                            elementName='input'
                            fieldId='safety.emergencyExit.description'
                            className='w-full'
                            label='Write short note'
                        />

                    </div>

                    <DynamicTagField
                        fieldId='safety.others'
                        defaultTags={formValues?.safety?.others}
                        placeholder='Hey, what else you want to add?'
                        label='Others (Hit Enter to add)'
                        className='w-full'
                    />
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
