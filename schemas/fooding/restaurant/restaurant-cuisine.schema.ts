import { z } from "zod"

export const restaurantCuisineFormSchema = z.object({
    cuisines: z.array(z.object({
        label: z.string(),
        value: z.string()
    })).optional()
})


export const restaurantCuisineClient2ServerSchema = restaurantCuisineFormSchema.transform((values) => ({
    cuisines: values?.cuisines?.map((option) => option.value)
}))

export const restaurantCuisineServer2ClientSchema = z.object({
    cuisines: z.array(z.object({
        name: z.string(),
        slug: z.string()
    })).optional().transform((values) => values?.map((value) => ({
        label: value.name,
        value: value.slug
    })))
})

export type TRestaurantCuisineClient2Server = z.infer<typeof restaurantCuisineClient2ServerSchema>

export type TRestaurantCuisineForm = z.infer<typeof restaurantCuisineFormSchema>

export const restaurantCuisineDefaultValues: TRestaurantCuisineForm = {
    cuisines: []
}