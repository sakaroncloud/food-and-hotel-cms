import { z } from "zod";

export const cuisineFormSchema = z.object({
    name: z.string().min(2, {
        message: "Please enter at least 2 characters"
    }),
    featuredImage: z.string().uuid({
        message: "Please select image"
    }).optional().nullable(),
    description: z.string().min(2)
})

export type TCuisineForm = z.infer<typeof cuisineFormSchema>
