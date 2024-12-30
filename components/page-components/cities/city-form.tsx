"use client"
import { Tag, TagInput } from "emblor";
import { CustomFormField, DynamicTagField, } from "@/components/form/custom-form-field"
import { FormFieldWrapper, FormFooter } from "@/components/form/form-field-wrapper"
import { Form, } from "@/components/ui/form"
import { submitCity } from "@/lib/actions/action.city"
import { API_ROUTES } from "@/lib/routes"
import { cn } from "@/lib/utils/utils"
import { cityFormSchema, TCityForm } from "@/schemas/fooding/schema.location"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import React, { useTransition } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type Props = {
  formValues?: TCityForm & { id: string, slug: string };
}

export const CityForm = ({ formValues }: Props) => {


  const router = useRouter()
  const form = useForm<TCityForm>({
    resolver: zodResolver(cityFormSchema),
    defaultValues: formValues || {
      name: "",
      pincodes: [{
        id: "",
        text: ""
      }]
    }
  })

  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient()

  const onSubmit = (values: TCityForm) => {

    startTransition(async () => {
      const response = await submitCity(values, formValues?.id);
      if (response.success == true) {
        toast.success(response.message)

        if (formValues) {

          queryClient.invalidateQueries({ queryKey: [API_ROUTES.city.queryKey, formValues.slug] })
        }
        if (!formValues) {
          router.push(response.data.slug)
          queryClient.invalidateQueries({ queryKey: [API_ROUTES.city.queryKey] })
        }
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
          description="Add your city details here"
          label="City Details"
          className="flex flex-col gap-6"
        >
          <CustomFormField
            elementName="input"
            fieldId="name"
            label="City Name"
            inputType="text"
            placeholder="Enter City Name"
            className="w-full"
          />
          <DynamicTagField
            fieldId="pincodes"
            label="Pincodes (Press Enter to add)"
            placeholder="Enter Pincodes"
            defaultTags={formValues?.pincodes}
          />
        </FormFieldWrapper>
        <FormFooter
          buttonLabel={formValues ? "Update" : "Add New"}
          pending={isPending}
          goBack={{
            path: "/cities"
          }}
        />
      </form>
    </Form>
  )
}
