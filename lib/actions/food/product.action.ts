"use server"

import { productFormSchema, TProductForm } from "@/schemas/fooding/schema.product";
import { SubmitHandler } from "../global.action";
import { API_ROUTES } from "../../routes";


export async function submitProduct(formData: TProductForm, param?: string) {
    const validationFields = productFormSchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Data tempered",
        };
    }

    const formattedValues = {
        ...validationFields.data,
        menus: validationFields.data?.menus?.map((menu) => menu.value)
    }

    return await SubmitHandler({
        ENDPOINT: API_ROUTES.product.endpoint,
        METHOD: param ? "PATCH" : "POST",
        DATA: formattedValues,
        PARAM: param,
    })

}

