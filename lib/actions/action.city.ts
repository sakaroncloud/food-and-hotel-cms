"use server"

import { API_ROUTES } from "../routes";
import { SubmitHandler } from "./global.action";
import { cityFormSchema, TCityForm } from "@/schemas/fooding/schema.location";

export async function submitCity(formData: TCityForm, param?: string) {
    const validationFields = cityFormSchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Submission failed",
            errors: validationFields.error.flatten().fieldErrors,
        };
    }

    const formattedData = {
        name: validationFields.data.name,
        pincodes: validationFields.data.pincodes?.map((pincode) => pincode.text) || []
    }

    return await SubmitHandler({
        ENDPOINT: API_ROUTES.city.endpoint,
        METHOD: param ? "PATCH" : "POST",
        DATA: formattedData,
        PARAM: param
    })

}

