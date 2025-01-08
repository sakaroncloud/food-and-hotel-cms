"use server"

import { productC2SSchema, productFormSchema, TProductForm } from "@/schemas/fooding/schema.product";
import { SubmitHandler } from "../global.action";
import { API_ROUTES } from "../../routes";


export async function submitProduct(formData: TProductForm, param?: string | number) {
    const validationFields = productC2SSchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Data tempered",
        };
    }

    console.log(validationFields.data)

    return await SubmitHandler({
        ENDPOINT: API_ROUTES.product.endpoint,
        METHOD: param ? "PATCH" : "POST",
        DATA: validationFields.data,
        PARAM: param,
    })

}

