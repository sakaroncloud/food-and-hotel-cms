import { imageNameSchema, TImageName } from "@/schemas/fooding/schema.restImage";
import { BACKEND_URL } from "../constants";
import { getSession } from "./session";
import { SubmitHandler } from "./global.action";

export const UploadHandler = async (formData: FormData, ENDPOINT: string) => {

    const session = await getSession()

    if (!session?.accessToken) {
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
            const error = errorData.message
            if (typeof error == "string") {
                return { message: error || "Something went wrong. Please try again later." };
            }
            else if (typeof error == "object") {
                if (Array.isArray(error)) {
                    return { message: error[0] || "Something went wrong. Please try again later." };
                }
                return { message: error?.message || "Something went wrong. Please try again later." }
            }
            return { message: "Something went wrong. Please try again later." }

        }

        const data = await response.json();
        return data;

    } catch (error: any) {

        if (error instanceof TypeError && error.message.includes('fetch failed')) {
            return {
                message: "Error: Unable to connect to the server"
            }
        } else if (error?.message.includes('ECONNREFUSED')) {
            return {
                message: "Error: Unable to connect to the server"
            }
        } else {
            return {
                message: "Unexpected error occured"
            }
        }

    }
};



export async function updateImageName(option: {
    formData: TImageName,
    endPoint: string,
    param: string
}) {
    const validationFields = imageNameSchema.safeParse(option.formData)
    if (!validationFields.success) {
        return {
            message: "Submission failed",
            errors: validationFields.error.flatten().fieldErrors,
        };
    }

    console.log(option.endPoint)
    return SubmitHandler({
        DATA: validationFields.data,
        ENDPOINT: option.endPoint,
        METHOD: "PATCH",
        PARAM: option.param
    })

}

