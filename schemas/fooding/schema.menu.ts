import { z } from "zod";

export const menuFormSchema = z.object({
    name: z.string().min(3, {
        message: "Please enter at least 3 characters"
    }),

    description: z.string().min(4, {
        message: "Desccription must be at least 4 characters"
    }),

    restaurant: z.string(),
})

export type TMenuForm = z.infer<typeof menuFormSchema>

export const menuDefaultValues: TMenuForm = {
    name: "",
    restaurant: "",
    description: ""
}
