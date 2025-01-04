import { z } from "zod";
export const roomBasicFormSchema = z.object({
    name: z.string().min(3, {
        message: "Room name must be at least of 3 characters"
    }),

    price: z.coerce.number({
        message: "Price must be a number",
    }).positive({
        message: "Price must be a positive number"
    }),

    length: z.coerce.number().positive({
        message: "Length must be a positive number"
    }),

    propertyId: z.number({
        message: "Property ID must be a number"
    }),

    width: z.coerce.number().positive({
        message: "Width must be a positive number"
    }),

    description: z.string().optional().nullable(),

    beds: z.coerce.number().positive({
        message: "Beds must be a positive number"
    }).int(),

})

export type TRoomBasicForm = z.infer<typeof roomBasicFormSchema>

export const roomBasicDefaultValues = {
    name: "Deluxe Suite",
    length: 0,
    width: 0,
    price: 0,
    description: "",
    beds: 0,
}