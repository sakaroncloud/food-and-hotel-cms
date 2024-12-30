import { ELanguage } from "@/lib/types/language.types";
import { z } from "zod";

export const languagesOptions = Object.keys(ELanguage).map((key) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(),
    value: ELanguage[key as keyof typeof ELanguage]
}))

export const propertyBasicFormSchema = z.object({
    name: z.string().min(2, {
        message: "Please enter at least 2 characters"
    }),

    email: z.string().email(),

    phone: z.string().min(10, {
        message: "Please enter at least 10 characters"
    }),

    description: z.string().min(2, {
        message: "Please enter at least 2 characters"
    }),

    commissionPercentage: z.coerce.number().positive(),


    checkInStartTime: z.string().min(4, {
        message: "Required"
    }),
    checkInEndTime: z.string().min(4, {
        message: "Required"
    }),
    checkOutTime: z.string().min(4, {
        message: "Required"
    }),

    languages: z.array(z.object({
        label: z.string(),
        value: z.nativeEnum(ELanguage)
    })),
})

export type TPropertyBasicForm = z.infer<typeof propertyBasicFormSchema>

export const propertyBasicDefaultValues: TPropertyBasicForm = {
    name: "Sagarmatha Hotel and Guest House",
    checkInEndTime: "19:00",
    checkInStartTime: "14:00",
    checkOutTime: "11:00",
    email: "demo@jubahospitality.com",
    phone: "+9779867710668",
    commissionPercentage: 1,
    languages: [{
        value: ELanguage.ENGLISH,
        label: ELanguage.ENGLISH
    }],
    description: "No wonder people are stringing up lights. Gift yourself a tangy, saucy McRib for a limited time and earn points toward free food too.* It’s only here for the holidays.",
}