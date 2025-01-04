import { z } from "zod"

export const restaurantCuisineFormSchema = z.object({
    cuisines: z.array(z.object({
        label: z.string(),
        value: z.string()
    })).optional()
})


export const restaurantCuisineC2SSchema = restaurantCuisineFormSchema.transform((values) => ({
    cuisines: values?.cuisines?.map((option) => option.value)
}))

export const restaurantCuisineS2CSchema = z.object({
    cuisines: z.array(z.object({
        name: z.string(),
        slug: z.string()
    })).optional().transform((values) => values?.map((value) => ({
        label: value.name,
        value: value.slug
    })))
})

export type TRestCuisineC2S = z.infer<typeof restaurantCuisineC2SSchema>

export type TRestCuisineForm = z.infer<typeof restaurantCuisineFormSchema>

export const restaurantCuisineDefaultValues: TRestCuisineForm = {
    cuisines: []
}