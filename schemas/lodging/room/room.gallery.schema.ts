import { z } from "zod";

export const roomGallerySchema = z.object({
    galleryIds: z.array(z.string().uuid()).optional(),
    propertyId: z.number({
        message: "Property ID must be a number"
    }),
})

export type TRoomGalleryClientForm = z.infer<typeof roomGallerySchema>