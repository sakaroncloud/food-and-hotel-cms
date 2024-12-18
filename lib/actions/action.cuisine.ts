"use server"

import { cuisineFormSchema, TCuisineForm } from "@/schemas/fooding/schema.cuisine";
import { SubmitHandler } from "./global.action";

export async function submitCusine(formData: TCuisineForm, param?: string) {
    const validationFields = cuisineFormSchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Submission failed",
            errors: validationFields.error.flatten().fieldErrors,
        };
    }

    return await SubmitHandler({
        ENDPOINT: "/cuisine",
        METHOD: param ? "PATCH" : "POST",
        DATA: validationFields.data,
        PARAM: param
    })

}

