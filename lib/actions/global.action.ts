"use server"

import { revalidatePath } from "next/cache";
import { BACKEND_URL } from "../constants"
import { getSession } from "./session";

type Option = {
    ENDPOINT: string;
    PARAM?: string | number;
    METHOD: "POST" | "PATCH" | "DELETE"
    DATA: any;
}

export const SubmitHandler = async (option: Option) => {

    if (!option.ENDPOINT || !option.METHOD) {
        return { error: "Invalid option object" };
    }
    console.log(`${BACKEND_URL}${option.ENDPOINT}${option.PARAM ? "/" + option.PARAM : ""}`)

    const session = await getSession()

    if (!session?.accessToken) {
        throw new Error("Unauthorized")
    }

    try {
        const response = await fetch(
            `${BACKEND_URL}${option.ENDPOINT}${option.PARAM ? "/" + option.PARAM : ""}`,
            {
                method: option.METHOD,
                body: JSON.stringify(option.DATA),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.accessToken}`,
                },
            }
        );


        if (!response.ok) {
            const errorData = await response.json();
            const error = errorData.message
            if (typeof error === "string") {
                return { message: error || "Something went wrong. Please try again later." };
            }
            else if (typeof error === "object") {
                if (Array.isArray(error)) {
                    return { message: error[0] || "Something went wrong. Please try again later." };
                }
                return { message: error?.message || "Something went wrong. Please try again later." }
            }
            return { message: "Something went wrong. Please try again later." }

        }

        const data = await response.json();
        revalidatePath("/(dashboard)", 'layout')
        return data;

    }
    catch (error: any) {

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


export const deleteHandler = async (option: {
    PARAM: string,
    ENDPOINT: string,
    revalidateTag?: string[]
}) => {

    if (!option.ENDPOINT || !option.PARAM) {
        return { error: "Invalid option object" };
    }

    const session = await getSession()

    if (!session?.accessToken) {
        return { error: "Unauthorized" };
    }

    console.log(`${BACKEND_URL}${option.ENDPOINT}${"/" + option.PARAM}`)

    try {
        const response = await fetch(
            `${BACKEND_URL}${option.ENDPOINT}${"/" + option.PARAM}`,
            {
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.accessToken}`
                },
            }
        );

        console.log(response)

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error response from API:", errorData);
            return errorData
        }

        const data = await response.json();
        revalidatePath("/(dashboard)", 'layout')
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


export const deleteForeverHandler = async (option: {
    PARAM: string,
    ENDPOINT: string,
    revalidateTag?: string[]

}) => {

    if (!option.ENDPOINT || !option.PARAM) {
        return { error: "Invalid option object" };
    }

    const session = await getSession()

    if (!session?.accessToken) {
        return { error: "Unauthorized" };
    }

    try {
        const response = await fetch(
            `${BACKEND_URL}${option.ENDPOINT}${"/" + option.PARAM}/delete-forever`,
            {
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.accessToken}`
                },
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error response from API:", errorData);
            return errorData
        }

        const data = await response.json();
        revalidatePath("/(dashboard)", 'layout')
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

export const restoreHandler = async (option: {
    PARAM: string,
    ENDPOINT: string,
    revalidateTag?: string[]

}) => {

    if (!option.ENDPOINT || !option.PARAM) {
        return { error: "Invalid option object" };
    }

    const session = await getSession()

    if (!session?.accessToken) {
        return { error: "Unauthorized" };
    }

    try {
        const response = await fetch(
            `${BACKEND_URL}${option.ENDPOINT}${"/" + option.PARAM}/restore`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.accessToken}`
                },
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            return errorData
        }

        const data = await response.json();
        revalidatePath("/(dashboard)", 'layout')
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

