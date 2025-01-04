import { restaurantBasicServer2ClientSchema, TRestaurantBasicClient2Server, TRestaurantBasicForm } from "@/schemas/fooding/restaurant/restaurant-basic.schema"
import { restaurantCuisineServer2ClientSchema, TRestaurantCuisineForm } from "@/schemas/fooding/restaurant/restaurant-cuisine.schema"
import dayjs from "dayjs"

export const parseRestaurantBasicFormFromServer2Client = (restaurantFromServer: TRestaurantBasicClient2Server): TRestaurantBasicForm & { id: number } | undefined => {
    const validatedFields = restaurantBasicServer2ClientSchema.safeParse(restaurantFromServer)

    if (validatedFields.success) {
        return {
            ...validatedFields.data,
            openingTime: dayjs(new Date(`1970-01-01T${validatedFields.data.openingTime}`).toISOString()).format('HH:mm'),
            closingTime: dayjs(new Date(`1970-01-01T${validatedFields.data.closingTime}`).toISOString()).format('HH:mm'),
        }
    }
    return undefined
}

export const parseRestCuisineFromServer2Client = (cuisineFromServer: any): TRestaurantCuisineForm | undefined => {
    const validatedFields = restaurantCuisineServer2ClientSchema.safeParse(cuisineFromServer)
    if (validatedFields.success) {
        return validatedFields.data
    }
    return undefined
}