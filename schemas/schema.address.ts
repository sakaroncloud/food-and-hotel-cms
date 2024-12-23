import { z } from "zod";

export const addressFormSchema = z.object({
    streetOne: z.string().min(2, {
        message: "Please enter at least 2 characters"
    }),
    area: z.string().min(2, {
        message: "Please enter at least 2 characters"
    }),
    mapLink: z.string().min(2, {
        message: "Please enter at least 2 characters"
    }).optional().nullable(),

    buildingName: z.string().min(2, {
        message: "Please enter at least 2 characters"
    }).optional().nullable(),
    floor: z.string().min(1, {
        message: "Please enter at least 1 characters"
    }).optional().nullable(),
    city: z.string({
        required_error: "Please select city"
    }).uuid({
        message: "Please select city"
    })
})

export type TAddressForm = z.infer<typeof addressFormSchema>

export const addressDefaultValues: TAddressForm = {
    streetOne: "",
    area: "Mall Road",
    mapLink: "",
    buildingName: "",
    floor: "",
    city: ""
}