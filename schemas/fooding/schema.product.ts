import { z } from "zod";

export const productFormSchema = z.object({
    name: z.string().min(2, {
        message: "Please enter at least 2 characters"
    }),

    isPureVeg: z.boolean().default(false),


    price: z.coerce.number().positive(),
    preparationTime: z.coerce.number().positive(),
    restaurant: z.string(),
    featuredImage: z.string().uuid({
        message: "Please select image"
    }).optional(),
})

export type TProductForm = z.infer<typeof productFormSchema>

export const productDefaultValues: TProductForm = {
    name: "",
    isPureVeg: false,
    price: 0,
    preparationTime: 0,
    restaurant: "",
    featuredImage: "",
}
