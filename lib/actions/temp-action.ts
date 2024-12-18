"use server";

import axiosInstance from "@/lib/axios-instance";
import { revalidatePath, revalidateTag } from "next/cache";
import { POST_METHOD } from "../types/endpoints";

export async function submitForm(options: {
    endPoint: string;
    formData?: FormData | any;
    method: POST_METHOD;
    revalidatePath?: string;
}) {
    try {
        const response: any = await axiosInstance[options.method](
            options.endPoint,
            options?.formData || {},
        );
        revalidateTag(options.endPoint);
        revalidatePath(options.revalidatePath || "/");
        return response?.data;
    } catch (e: any) {
        if (typeof e === "string") {
            return {
                error: e || "Something went wrong",
            };
        } else if (typeof e?.response?.data?.message == "string") {
            return {
                error: e?.response?.data?.message || "Something went wrong",
            };
        } else if (Array.isArray(e?.response?.data?.message)) {
            return {
                error: e?.response?.data?.message[0] || "Something went wrong",
            };
        } else if (typeof e?.response?.data?.message === "object") {
            if (Array.isArray(e?.response?.data?.message?.message)) {
                return {
                    error:
                        e?.response?.data?.message?.message[0] || "Something went wrong",
                };
            } else if (typeof e?.response?.data?.message?.message === "string") {
                return {
                    error: e?.response?.data?.message?.message || "Something went wrong",
                };
            } else {
            }
        }
    }
}

export async function deleteHandler(options: {
    endPoint: string;
    revalidatePath?: string;
}) {
    try {
        const response: any = await axiosInstance.delete(options.endPoint);
        revalidateTag(options.endPoint);
        revalidatePath(options.revalidatePath || "/");
        return response?.data;
    } catch (e: any) {
        if (typeof e === "string") {
            return {
                error: e || "Something went wrong",
            };
        } else if (typeof e?.response?.data?.message == "string") {
            return {
                error: e?.response?.data?.message || "Something went wrong",
            };
        } else if (Array.isArray(e?.response?.data?.message)) {
            return {
                error: e?.response?.data?.message[0] || "Something went wrong",
            };
        } else if (typeof e?.response?.data?.message === "object") {
            if (Array.isArray(e?.response?.data?.message?.message)) {
                return {
                    error:
                        e?.response?.data?.message?.message[0] || "Something went wrong",
                };
            } else if (typeof e?.response?.data?.message?.message === "string") {
                return {
                    error: e?.response?.data?.message?.message || "Something went wrong",
                };
            } else {
            }
        }
    }
}