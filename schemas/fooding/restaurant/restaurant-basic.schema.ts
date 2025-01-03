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


export const weekDaysOptions = Object.keys(EWeekDay).map((key) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(),
    value: EWeekDay[key as keyof typeof EWeekDay]
}))

export const restaurantBasicFormSchema = z.object({
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

    dayOfWeek: dayOfWeekSchema,

    openingTime: z.string().min(4, {
        message: "Required"
    }),
    closingTime: z.string().min(4, {
        message: "Required"
    }),
    isEnabled: z.boolean(),

    commissionPercentage: z.coerce.number().positive(),
})

export type TRestaurantBasicForm = z.infer<typeof restaurantBasicFormSchema>

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