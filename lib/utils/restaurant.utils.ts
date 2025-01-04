import { restaurantBasicS2CSchema, TRestBasicC2S, TRestBasicForm } from "@/schemas/fooding/restaurant/restaurant-basic.schema"
import { restBrandingS2CSchema, TRestBrandingForm } from "@/schemas/fooding/restaurant/restaurant-branding.schema"
import { restaurantCuisineS2CSchema, TRestCuisineForm } from "@/schemas/fooding/restaurant/restaurant-cuisine.schema"
import dayjs from "dayjs"

export const parseRestBasicFormFromS2C = (restaurantFromServer: TRestBasicC2S): TRestBasicForm & { id: number } | undefined => {
    const validatedFields = restaurantBasicS2CSchema.safeParse(restaurantFromServer)

    if (validatedFields.success) {
        return {
            ...validatedFields.data,
            openingTime: dayjs(new Date(`1970-01-01T${validatedFields.data.openingTime}`).toISOString()).format('HH:mm'),
            closingTime: dayjs(new Date(`1970-01-01T${validatedFields.data.closingTime}`).toISOString()).format('HH:mm'),
        }
    }
    return undefined
}

export const parseRestCuisineFromS2C = (cuisineFromServer: any): TRestCuisineForm | undefined => {
    const validatedFields = restaurantCuisineS2CSchema.safeParse(cuisineFromServer)
    if (validatedFields.success) {
        return validatedFields.data
    }
    return undefined
}

export const parseRestBrandingFromS2C = (brandingsFromServer: any): TRestBrandingForm | undefined => {

    const validatedFields = restBrandingS2CSchema.safeParse(brandingsFromServer)
    if (validatedFields.success) {
        return validatedFields.data
    }

    return undefined
}