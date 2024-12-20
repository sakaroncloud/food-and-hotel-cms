"use server"

import { restaurantFormSchema, TRestaurantForm } from "@/schemas/fooding/schema.restaurant";
import { SubmitHandler } from "./global.action";
import { API_ROUTES } from "../routes";

export async function submitRestaurant(formData: TRestaurantForm, param?: string) {
    const validationFields = restaurantFormSchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Submission failed",
            errors: validationFields.error.flatten().fieldErrors,
        };
    }

    const formattedValues = {
        ...validationFields.data,
        dayOfWeek: validationFields.data?.dayOfWeek?.map((day) => day.value),
        cuisines: validationFields.data.cuisines?.map((cuisine) => cuisine.value)
    }

    console.log(formattedValues)

    return await SubmitHandler({
        ENDPOINT: API_ROUTES.restaurant.endpoint,
        METHOD: param ? "PATCH" : "POST",
        DATA: formattedValues,
        PARAM: param
    })

}

