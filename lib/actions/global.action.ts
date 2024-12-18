"use server"

import { BACKEND_URL } from "../constants"
import { getSession } from "./session";

type Option = {
    ENDPOINT: string;
    PARAM?: string;
    METHOD: "POST" | "PATCH" | "DELETE"
    DATA: any;
}

export const SubmitHandler = async (option: Option) => {

    if (!option.ENDPOINT || !option.METHOD) {
        console.error("Missing required properties in 'option' object");
        return { error: "Invalid option object" };
    }

    const session = await getSession()

    if (!session?.accessToken) {
        console.error("No session or access token found");
        return { error: "Unauthorized" };
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
            console.error("Error response from API:", errorData);
            return errorData;
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Network or server error:", error);
        return { error: "Something went wrong. Please try again later." };
    }
};


export const deleteHandler = async (option: {
    PARAM: string,
    ENDPOINT: string,
}) => {

    if (!option.ENDPOINT || !option.PARAM) {
        return { error: "Invalid option object" };
    }

    const session = await getSession()

    if (!session?.accessToken) {
        console.error("No session or access token found");
        return { error: "Unauthorized" };
    }

    try {
        const response = await fetch(
            `${BACKEND_URL}${option.ENDPOINT}${"/" + option.PARAM}`,
            {
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
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
        return { error: "Something went wrong. Please try again later." };
    }
};

