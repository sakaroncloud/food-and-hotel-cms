import { z } from "zod";

export const imageNameSchema = z.object({
    originalName: z.string().min(1, {
        message: "Name is required",
    })
});

export type TImageName = z.infer<typeof imageNameSchema>