import { z } from "zod";

export const cityFormSchema = z.object({
    name: z.string().min(2, {
        message: "Please enter at least 2 characters"
    }),

    pincodes: z.array(z.object({
        id: z.string(),
        text: z.string(),
    })).optional()
})

export type TCityForm = z.infer<typeof cityFormSchema>
