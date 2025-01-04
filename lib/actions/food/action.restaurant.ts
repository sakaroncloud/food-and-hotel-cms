"use server"

import { restaurantFormSchema, TRestaurantForm } from "@/schemas/fooding/schema.restaurant";
import { SubmitHandler } from "../global.action";
import { API_ROUTES } from "../../routes";
import { restaurantBasicFormSchema, TRestaurantBasicForm } from "@/schemas/fooding/restaurant/restaurant-basic.schema";
import { restaurantCuisineClient2ServerSchema, TRestaurantCuisineForm } from "@/schemas/fooding/restaurant/restaurant-cuisine.schema";

export async function submitRestaurantBasic(formData: TRestaurantBasicForm, param?: string | number) {
    const validationFields = restaurantBasicFormSchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Data tempered",
        };
    }
    const formattedValues = {
        ...validationFields.data,
        dayOfWeek: validationFields.data?.dayOfWeek?.map((day) => day.value),
    }
    return await SubmitHandler({
        ENDPOINT: API_ROUTES.restaurant.endpoint,
        METHOD: param ? "PATCH" : "POST",
        DATA: formattedValues,
        PARAM: param
    })
}


export async function submitRestaurant(formData: TRestaurantForm, param?: string) {
    const validationFields = restaurantFormSchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Data tempered",
        };
    }

    const formattedValues = {
        ...validationFields.data,
        dayOfWeek: validationFields.data?.dayOfWeek?.map((day) => day.value),
        cuisines: validationFields.data.cuisines?.map((cuisine) => cuisine.value)
    }


    return await SubmitHandler({
        ENDPOINT: API_ROUTES.restaurant.endpoint,
        METHOD: param ? "PATCH" : "POST",
        DATA: formattedValues,
        PARAM: param
    })

}


/**
 * Restaurant Cuisine
 */

export async function submitRestaurantCuisine(formData: TRestaurantCuisineForm, param: string | number) {
    const validationFields = restaurantCuisineClient2ServerSchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Data tempered",
        };
    }

    console.log(validationFields.data)

    return await SubmitHandler({
        ENDPOINT: API_ROUTES.restaurant.endpoint + "/" + param + "/cuisines",
        METHOD: "PATCH",
        DATA: validationFields.data,
    })
}

