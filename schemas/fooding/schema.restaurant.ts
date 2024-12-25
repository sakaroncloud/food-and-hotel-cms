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

export const weekDaysOptions = Object.keys(EWeekDay).map((key) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(),
    value: EWeekDay[key as keyof typeof EWeekDay]
}))


export const discountTypeOptions = Object.keys(EDiscountType).map((key) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(),
    value: EDiscountType[key as keyof typeof EDiscountType]
}))

const hasGlobalOfferSchema = z.object({
    heading: z.string().min(1, { message: "Heading is required" }),
    subHeading: z.string().min(1, { message: "Subheading is required" }),
    actualValue: z.coerce.number().positive(),
    type: z.nativeEnum(EDiscountType),
    maxUpTo: z.coerce.number().positive(),
})

export const restaurantFormSchema = z.object({
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
    featuredImage: z.string().uuid({
        message: "Please select image"
    }).optional().nullable(),

    logo: z.string().uuid({
        message: "Please select image"
    }).optional().nullable(),

    dayOfWeek: z.array(z.object({
        value: z.nativeEnum(EWeekDay),
        label: z.string()
    })).optional(),

    cuisines: z.array(z.object({
        label: z.string(),
        value: z.string()
    })).optional(),

    openingTime: z.string().min(4, {
        message: "Required"
    }),
    closingTime: z.string().min(4, {
        message: "Required"
    }),
    isEnabled: z.boolean(),

    commissionPercentage: z.coerce.number().positive(),
    // for global offers
    hasGlobalOffer: hasGlobalOfferSchema.optional(),

})

export type TRestaurantForm = z.infer<typeof restaurantFormSchema>

export const restaurantDefaultValues: TRestaurantForm = {
    // address : null 
    // TODO: also add address while addings
    email: "",
    phone: "",
    closingTime: "",
    commissionPercentage: 1,
    cuisines: [],
    dayOfWeek: [{
        value: EWeekDay.MONDAY,
        label: "Monday"
    }],
    description: "No wonder people are stringing up lights. Gift yourself a tangy, saucy McRib for a limited time and earn points toward free food too.* It’s only here for the holidays.",
    //    email: null;
    featuredImage: "",
    // hasGlobalOffer: {
    //     heading: "13% off",
    //     subHeading: "upto Rs 50",
    //     actualValue: 13,
    //     type: EDiscountType.PERCENTAGE,
    //     maxUpTo: 50
    // },
    isEnabled: true,
    isPureVeg: false,
    logo: "",
    // menus:[],
    name: "McDonald's",
    openingTime: "",

    // phone: null,
    // slug:""

}