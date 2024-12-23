import { z } from "zod";

export const menuFormSchema = z.object({
    name: z.string().min(2, {
        message: "Please enter at least 2 characters"
    }),

    isPureVeg: z.boolean().default(false),

    restaurant: z.string().uuid({
        message: "Please select restaurant"
    }),

    featuredImage: z.string().uuid({
        message: "Please select image"
    }).optional(),
})

export type TMenuForm = z.infer<typeof menuFormSchema>

export const menuDefaultValues: TMenuForm = {
    name: "",
    isPureVeg: false,
    restaurant: "",
    featuredImage: "",
}
