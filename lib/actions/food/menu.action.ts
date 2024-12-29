"use server"

import { SubmitHandler } from "../global.action";
import { API_ROUTES } from "../../routes";
import { menuFormSchema, TMenuForm } from "@/schemas/fooding/schema.menu";


export async function submitMenu(formData: TMenuForm, param?: string) {

    const validationFields = menuFormSchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Data tempered",
        };
    }


    return await SubmitHandler({
        ENDPOINT: API_ROUTES.menu.endpoint,
        METHOD: param ? "PATCH" : "POST",
        DATA: validationFields.data,
        PARAM: param
    })

}

