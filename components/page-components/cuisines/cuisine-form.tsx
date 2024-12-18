"use client"

import { ChooseNewImageCard } from "@/components/choose-image-card/new-choose-image-card"
import { CustomFormField } from "@/components/form/custom-form-field"
import { FormFieldWrapper, FormFooter } from "@/components/form/form-field-wrapper"
import { Form } from "@/components/ui/form"
import { submitCusine } from "@/lib/actions/action.cuisine"
import { cuisineFormSchema, TCuisineForm } from "@/schemas/fooding/schema.cuisine"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect, useTransition } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type Props = {
  formValues?: TCuisineForm & { id: string, slug: string }
}

export const CuisineForm = ({ formValues }: Props) => {

  const router = useRouter()
  const form = useForm<TCuisineForm>({
    resolver: zodResolver(cuisineFormSchema),
    defaultValues: formValues || {
      description: "",
      featuredImage: "",
      name: ""
    }
  })

  useEffect(() => {
    localStorage.setItem("userFormModified", form.formState.isDirty.toString())
  }, [form.formState.isDirty])


  const [isPending, startTransition] = useTransition();


  const onSubmit = (values: TCuisineForm) => {
    startTransition(async () => {
      const response = await submitCusine(values, formValues?.id);
      if (response.success == true) {
        toast.success(response.message)
        router.push(response.data.slug)
      }
      else {
        toast.error(response.message)
      }
    })
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <FormFieldWrapper
          description="Add your cuisine details here"
          label="Cuisine Details"
          className="flex flex-col gap-6"
        >
          <CustomFormField
            elementName="input"
            fieldId="name"
            label="Cuisine Name"
            inputType="text"
            placeholder="Enter Cuisine Name"
            className="w-full"
          />
          <CustomFormField
            elementName="textarea"
            fieldId="description"
            label="Description"
            placeholder="Describe a little about your cuisine"
            className="w-full"
          />

          <ChooseNewImageCard
            fieldId={"featuredImage"}
            label={"Featured Image"}
            allowMultiple={false}
          />
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
