import { z } from "zod";

export enum EDiscountType {
    PERCENTAGE = "percentage",
    FIXED = "fixed"
}

export enum EWeekDay {
    MONDAY = "monday",
    TUESDAY = "tuesday",
    WEDNESDAY = "wednesday",
    THURSDAY = "thursday",
    FRIDAY = "friday",
    SATURDAY = "saturday",
    SUNDAY = "sunday"
}

const dayOfWeekSchema = z.array(z.object({
    value: z.nativeEnum(EWeekDay),
    label: z.string()
})).optional()

const dayOfWeekServer2Client = z.array(z.nativeEnum(EWeekDay)).transform((values) => values.map((value) => ({
    value: value,
    label: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
})))

const dayOfWeekClient2Server = z.array(z.nativeEnum(EWeekDay)).transform((values) => values.map((value) => value))

export const weekDaysOptions = Object.keys(EWeekDay).map((key) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(),
    value: EWeekDay[key as keyof typeof EWeekDay]
}))

const basicSchema = z.object({
    name: z.string().min(2, {
        message: "Please enter at least 2 characters"
    }),
    description: z.string().min(2, {
        message: "Please enter at least 2 characters"
    }),

    email: z.string().email().optional().nullable(),
    phone: z.string().min(10, {
        message: "Please enter at least 10 characters"
    }),

    isPureVeg: z.boolean().default(false),

    openingTime: z.string().min(4, {
        message: "Required"
    }),
    closingTime: z.string().min(4, {
        message: "Required"
    }),
    isEnabled: z.boolean(),

    commissionPercentage: z.coerce.number().positive(),
})

export const restaurantBasicFormSchema = basicSchema.extend({
    dayOfWeek: dayOfWeekSchema,
})

export const restaurantBasicServer2ClientSchema = basicSchema.extend({
    id: z.number(),
    dayOfWeek: dayOfWeekServer2Client,
})

export const restaurantBasicClient2ServerSchema = basicSchema.extend({
    dayOfWeek: dayOfWeekClient2Server,
})

export type TRestaurantBasicForm = z.infer<typeof restaurantBasicFormSchema>
export type TRestaurantBasicServer2Client = z.infer<typeof restaurantBasicServer2ClientSchema>
export type TRestaurantBasicClient2Server = z.infer<typeof restaurantBasicClient2ServerSchema>

export const restaurantBasicDefaultValues: TRestaurantBasicForm = {
    email: "",
    phone: "",
    closingTime: "",
    commissionPercentage: 1,
    dayOfWeek: [{
        value: EWeekDay.MONDAY,
        label: "Monday"
    }],
    description: "No wonder people are stringing up lights. Gift yourself a tangy, saucy McRib for a limited time and earn points toward free food too.* It’s only here for the holidays.",
    isEnabled: true,
    isPureVeg: false,
    name: "McDonald's",
    openingTime: "",
}