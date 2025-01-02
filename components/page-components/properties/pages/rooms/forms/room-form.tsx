"use client"

import { CustomFormField } from "@/components/form/custom-form-field"
import { FormFieldWrapper, FormFooter } from "@/components/form/form-field-wrapper"
import { Form } from "@/components/ui/form"
import { submitRoom } from "@/lib/actions/lodging/action.room"
import { roomBasicDefaultValues, roomBasicFormSchema, TRoomBasicForm } from "@/schemas/lodging/room/room-basic.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type Props = {
    propertyId: number | string;
    setActiveTab?: React.Dispatch<React.SetStateAction<number>>;
    formValues?: TRoomBasicForm;
    roomId?: string;
}

export const RoomBasicForm = ({ formValues, propertyId, roomId }: Props) => {
    console.log(propertyId)
    const router = useRouter()
    const form = useForm<TRoomBasicForm>({
        resolver: zodResolver(roomBasicFormSchema),
        defaultValues: formValues || {
            ...roomBasicDefaultValues,
            propertyID: parseInt(`${propertyId}`)
        }
    })

    const [isPending, startTransition] = useTransition();

    const onSubmit = (values: TRoomBasicForm) => {
        console.log(values)
        startTransition(async () => {
            const response = await submitRoom(values, roomId);
            if (response.success == true) {
                toast.success(response.message)
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
                    description="Add your room details here"
                    label="Room Details"
                    className="flex flex-col gap-6"
                >
                    <div className="grid grid-cols-2 gap-4 w-full">
                        <CustomFormField
                            elementName="input"
                            fieldId="name"
                            label="Room Name"
                            inputType="text"
                            placeholder="Enter Room Name"
                            className="w-full"
                        />

                        <CustomFormField
                            elementName="input"
                            fieldId="price"
                            label="Price"
                            inputType="number"
                            placeholder="Enter Price"
                            className="w-full"
                            step={"any"}
                        />

                        <CustomFormField
                            elementName="input"
                            fieldId="beds"
                            label="Beds"
                            inputType="number"
                            placeholder="Enter Number of Beds"
                            className="w-full"
                            min={1}
                            max={20}
                        />
                    </div>

                    <CustomFormField
                        elementName="textarea"
                        fieldId="description"
                        label="Description"
                        placeholder="Describe a little about your room"
                        className="w-full"
                    />
                </FormFieldWrapper>

                {/* Sizes */}
                <FormFieldWrapper
                    description="Enter the dimensions of the room"
                    label="Room Dimensions (In Feet)"
                >
                    <div className="grid grid-cols-2 gap-6 w-full">
                        <CustomFormField
                            elementName="input"
                            fieldId="length"
                            label="Length (in feet)"
                            inputType="number"
                            step={"any"}
                            min={5}
                            max={100}
                            placeholder="Enter Length"
                            className="w-full"
                        />
                        <CustomFormField
                            elementName="input"
                            fieldId="width"
                            label="Width  (in feet)"
                            step={"any"}
                            inputType="number"
                            className="w-full"
                            min={5}
                            max={100}
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
        </Form >
    )
}
