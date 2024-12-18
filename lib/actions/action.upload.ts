"use server"

import { imageNameSchema, TImageName } from "@/schemas/fooding/schema.restImage";
import { BACKEND_URL } from "../constants";
import { getSession } from "./session";
import { SubmitHandler } from "./global.action";

export const UploadHandler = async (formData: FormData, ENDPOINT: string) => {

    const session = await getSession()

    if (!session?.accessToken) {
        console.error("No session or access token found");
        return { error: "Unauthorized" };
    }

    try {
        const response = await fetch(
            `${BACKEND_URL}${ENDPOINT}`, {
            method: "POST",
            body: formData,
            headers: {
                "Authorization": `Bearer ${session.accessToken}`,
            },
        }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error response from API:", errorData);
            return errorData
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Network or server error:", error);
        return { error: "Something went wrong. Please try again later." };
    }
};

export async function updateImageName(formData: TImageName, endPoint: string, param: string) {
    const validationFields = imageNameSchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Submission failed",
            errors: validationFields.error.flatten().fieldErrors,
        };
    }

    return SubmitHandler({
        DATA: validationFields.data,
        ENDPOINT: endPoint,
        METHOD: "PATCH",
        PARAM: param
    })

}

