import { z } from "zod";

const menusFormSchema = z.array(z.object({
    label: z.string(),
    value: z.string()
})).optional()


const bannerImageSchema = z.string().uuid({
    message: "Please select image"
}).optional()


const bannerImageS2CSchema = z.object({
    id: z.string(),
    url: z.string(),
}).transform((values) => values?.id)

const bannerImageC2SSchema = z.string().optional().transform((value) => value)

const menusS2CSchema = z.array(z.object({
    name: z.string(),
    id: z.number()
})).optional().transform((values) => values?.map((value) => ({
    label: value.name,
    value: value.id.toString()
})))


const menusC2Server = z.array(z.object({
    label: z.string(),
    value: z.string()
})).optional().transform((values) => values?.map((value) => parseInt(value.value)))


const productBaseSchema = z.object({
    name: z.string().min(2, {
        message: "Please enter at least 2 characters"
    }),
    price: z.coerce.number().positive(),
    preparationTime: z.coerce.number().positive(),
    restaurantId: z.number({
        message: "Restaurant ID must be a number"
    }),
    description: z.string().min(3, {
        message: "Desccription must be at least 3 characters"
    }),
})


export const productFormSchema = productBaseSchema.extend({
    menus: menusFormSchema,
    bannerImage: bannerImageSchema,
})

export const productS2CSchema = productBaseSchema.extend({
    menus: menusS2CSchema,
    bannerImage: bannerImageS2CSchema
})


export const productC2SSchema = productBaseSchema.extend({
    menus: menusC2Server,
    bannerImage: bannerImageC2SSchema,
})


export type TProductS2C = z.infer<typeof productS2CSchema>

export type TProductForm = z.infer<typeof productFormSchema>

export const productDefaultValues: Omit<TProductForm, "restaurantId"> = {
    name: "",
    description: "",
    price: 0,
    preparationTime: 0,
    bannerImage: "",
}
