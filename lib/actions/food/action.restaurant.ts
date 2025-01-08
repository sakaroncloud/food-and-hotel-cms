"use server"

import { restaurantFormSchema, TRestForm } from "@/schemas/fooding/schema.restaurant";
import { SubmitHandler } from "../global.action";
import { API_ROUTES } from "../../routes";
import { restaurantBasicFormSchema, TRestBasicForm } from "@/schemas/fooding/restaurant/restaurant-basic.schema";
import { restaurantCuisineC2SSchema, TRestCuisineForm } from "@/schemas/fooding/restaurant/restaurant-cuisine.schema";
import { restBrandingFormSchema, TRestBrandingForm } from "@/schemas/fooding/restaurant/restaurant-branding.schema";
import { restaurantGallerySchema, TRestaurantGalleryClientForm } from "@/schemas/fooding/restaurant/restaurant.gallery.schema";
import { TAddress } from "@/lib/types/address.types";
import { TAddressForm } from "@/schemas/schema.address";

export async function submitRestaurantBasic(formData: TRestBasicForm, param?: string | number) {
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


export async function submitRestaurant(formData: TRestForm, param?: string) {
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

export async function submitRestaurantCuisine(formData: TRestCuisineForm, param: string | number) {
    const validationFields = restaurantCuisineC2SSchema.safeParse(formData)
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


/**
 * Restaurant Branding
 */


export async function updateRestaurantBrandings(formData: TRestBrandingForm, param: string | number) {
    const validationFields = restBrandingFormSchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Data tempered",
        };
    }

    console.log(validationFields.data)


    return await SubmitHandler({
        ENDPOINT: API_ROUTES.restaurant.endpoint + "/" + param + "/brandings",
        METHOD: "PATCH",
        DATA: validationFields.data,
    })
}


export async function submitRestaurantGallery(formData: TRestaurantGalleryClientForm, param: string | number) {

    const validationFields = restaurantGallerySchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Data tempered",
        };
    }

    return await SubmitHandler({
        ENDPOINT: API_ROUTES.restaurant.endpoint + "/" + param + "/gallery",
        METHOD: "PATCH",
        DATA: validationFields.data,
    })
}


