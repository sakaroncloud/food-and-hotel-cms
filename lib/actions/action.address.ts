"use server"

import { SubmitHandler } from "./global.action";
import { addressFormSchema, TAddressForm } from "@/schemas/schema.address";


export async function submitAddress(formData: TAddressForm, ENDPOINT: string) {
    const validationFields = addressFormSchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Data tempered",
        };
    }

    return await SubmitHandler({
        ENDPOINT,
        METHOD: "PATCH",
        DATA: validationFields.data,
    })

}

