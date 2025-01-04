import { z } from "zod";

export const restBrandingFormSchema = z.object({
    logo: z.string().uuid({
        message: "Please select Logo"
    }).optional().nullable(),
    bannerImage: z.string().uuid({
        message: "Please select Banner Image"
    }).optional().nullable(),
})

export const restBrandingS2CSchema = z.object({
    logo: z.object({
        id: z.string(),
        url: z.string(),
    }).optional().nullable(),
    bannerImage: z.object({
        id: z.string(),
        url: z.string(),
    }).optional().nullable(),
}).transform((values) => ({
    logo: values?.logo?.id,
    bannerImage: values?.bannerImage?.id
}))


export type TRestBrandingS2C = z.infer<typeof restBrandingS2CSchema>

export type TRestBrandingForm = z.infer<typeof restBrandingFormSchema>

export const restaurantBrandingDefaultValues: TRestBrandingForm = {
    logo: "",
    bannerImage: ""
}