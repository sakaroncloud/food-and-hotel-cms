import { z } from "zod";

export const restaurantGallerySchema = z.object({
    galleryIds: z.array(z.string().uuid()).optional(),
})

export const restaurantGalleryS2CSchema = z.object({
    galleryIds: z.array(
        z.object({
            id: z.string(),
            url: z.string(),
            name: z.string(),
        })
    ).transform((values) => values.map((value) => value.id))
})



export type TRestaurantGalleryClientForm = z.infer<typeof restaurantGallerySchema>