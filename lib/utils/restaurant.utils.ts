import { restaurantBasicServer2ClientSchema, TRestaurantBasicClient2Server, TRestaurantBasicForm } from "@/schemas/fooding/restaurant/restaurant-basic.schema"
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