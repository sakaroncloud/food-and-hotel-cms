import { CustomFormField } from "@/components/form/custom-form-field";
import { FormFieldWrapper, FormFooter } from "@/components/form/form-field-wrapper";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { submitPropertyLocations } from "@/lib/actions/lodging/action.property";
import { defaultPropertyLocations, propertyLocationsSchema, TPropertyLocationsForm } from "@/schemas/lodging/property/property-locations.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
    formValues?: TPropertyLocationsForm;
    id: string;
}
export const PropertyLocationsForm = ({ formValues, id }: Props) => {

    const form = useForm<TPropertyLocationsForm>({
        resolver: zodResolver(propertyLocationsSchema),
        defaultValues: formValues || defaultPropertyLocations,
        mode: "onChange",
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "places"
    })

    const [isPending, startTransition] = useTransition();

    const onSubmit = (values: TPropertyLocationsForm) => {
        startTransition(async () => {
            const response = await submitPropertyLocations(values, id);
            if (response.success == true) {
                toast.success(response.message)
            }
            else {
                toast.error(response.message || "Something went wrong")
            }
        })
    };

    const isValid = form.formState.isValid


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <FormFieldWrapper
                    description='Select all general rules  that are applicable'
                    label='Nearest Transportations Accessibility'
                    className='flex justify-between flex-1 '
                >

                    <div className="w-full space-y-6">
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex gap-4">
                                <CustomFormField
                                    elementName="input"
                                    fieldId={`places.${index}.name`}
                                    label="Name"
                                    placeholder="Enter name"
                                    className="w-full"
                                />
                                <CustomFormField
                                    elementName="input"
                                    inputType="number"
                                    fieldId={`places.${index}.distance`}
                                    label="Distance"
                                    placeholder="Enter distance in meters"
                                    className="w-full"
                                />
                                <div className="w-12 flex self-end">
                                    {fields.length > 1 && <Button
                                        className="self-end h-8 w-8 text-red-500"
                                        variant="outline"
                                        size={"lg"}
                                        onClick={() => remove(index)}
                                    >
                                        Delete
                                    </Button>}
                                </div>
                            </div>
                        ))}

                        {isValid && <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={() => append({ name: "", distance: 0 })}
                        >
                            Add More
                        </Button>}
                    </div>
                </FormFieldWrapper>


                <FormFooter
                    buttonLabel={"Update"}
                    pending={isPending}
                    goBack={{
                        path: `/properties`
                    }}
                />
            </form>
        </Form>
    )
}
