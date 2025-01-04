import { z } from "zod";

export const propertyGallerySchema = z.object({
    galleryIds: z.array(z.string().uuid()).optional(),
})

export const propertyGalleryS2CSchema = z.object({
    galleryIds: z.array(
        z.object({
            id: z.string(),
            url: z.string(),
            name: z.string(),
        })
    ).transform((values) => values.map((value) => value.id))
})



export type TPropertyGalleryClientForm = z.infer<typeof propertyGallerySchema>