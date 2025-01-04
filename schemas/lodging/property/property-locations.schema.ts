import { z } from "zod";

export type TPropertyNearestLocations = {

    places: { name: string, distance: string }[];
};
export const propertyLocationsServerSchema = z.array(z.object({
    name: z.string().min(2, {
        message: "location name must be at least 2 characters"
    }),
    distance: z.coerce.number({
        message: "Distance must be a number"
    }).positive({
        message: "Distance must be a positive number"
    })
}))




export const propertyLocationsSchema = z.object({
    places: z.array(z.object({
        name: z.string().min(2, {
            message: "location name must be at least 2 characters"
        }),
        distance: z.coerce.number({
            message: "Distance must be a number"
        }).positive({
            message: "Distance must be a positive number"
        })
    }))
})

export type TPropertyLocationsForm = z.infer<typeof propertyLocationsSchema>;

export const defaultPropertyLocations: TPropertyLocationsForm = {
    places: [{
        name: "",
        distance: 0
    }]
}