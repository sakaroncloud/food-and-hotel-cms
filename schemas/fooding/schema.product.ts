import { z } from "zod";

export const productFormSchema = z.object({
    name: z.string().min(2, {
        message: "Please enter at least 2 characters"
    }),

    menus: z.array(z.object({
        label: z.string(),
        value: z.string()
    })).optional(),

    price: z.coerce.number().positive(),
    preparationTime: z.coerce.number().positive(),
    restaurant: z.string(),
    description: z.string().min(3, {
        message: "Desccription must be at least 3 characters"
    }),
    bannerImage: z.string().uuid({
        message: "Please select image"
    }).optional(),
})

export type TProductForm = z.infer<typeof productFormSchema>

export const productDefaultValues: TProductForm = {
    name: "",
    description: "",
    price: 0,
    preparationTime: 0,
    restaurant: "",
    bannerImage: "",
    menus: []
}
