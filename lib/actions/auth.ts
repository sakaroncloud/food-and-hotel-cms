"use server";
import { loginSchema, signUpSchema, TLogin, TSignUp } from "@/schemas/auth.schema";
import { ReturnType, TBaseResponse } from "@/lib/types/response.type";
import { Role, TLoginResponse } from "@/lib/types/auth.response.type";
import { createSession, deleteSession, getSession } from "./session";
import { API_ROUTES } from "@/lib/routes";
import { BACKEND_URL } from "@/lib/constants";

export async function signIn(formData: TLogin): Promise<
    ReturnType & {
        data?: {
            accessToken?: string;
        };
    }
> {
    const validationFields = loginSchema.safeParse(formData);

    if (!validationFields.success) {
        return {
            message: "Submission failed",
            errors: validationFields.error.flatten().fieldErrors,
        };
    }

    const response = await fetch(
        BACKEND_URL + API_ROUTES.login.endpoint,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(validationFields.data),
        }
    );


    const result: TBaseResponse<TLoginResponse> = await response.json();

    if (response.ok) {
        if (result.data.tokens.limitError) {
            return {
                message: result.data.tokens.limitError,
                data: {
                    accessToken: result.data.tokens.accessToken,
                },
            };
        } else {

            if (result.data.role !== Role.ADMIN) {
                return {
                    message: "Invalid Credentials"
                }
            }
            await createSession({
                user: {
                    id: result.data.id,
                    name: result.data.firstName,
                    role: result.data.role,
                },
                accessToken: result.data.tokens.accessToken,
                refreshToken: result.data.tokens?.refreshToken || "",
                csrfId: result.data.tokens.csrfId || ""
            });
            return {
                success: "Login successful",
            };
        }
    } else {
        return {
            message: result?.message || result?.message[0],
        };
    }
}

export async function signUp(formData: TSignUp): Promise<ReturnType> {
    const validationFields = signUpSchema.safeParse(formData);

    if (!validationFields.success) {
        return {
            message: "Submission failed",
            errors: validationFields.error.flatten().fieldErrors,
        };
    }

    const response = await fetch(
        BACKEND_URL + API_ROUTES.signUp,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(validationFields.data),
        }
    );

    const data = await response.json();
    if (response.ok) {
        return {
            success: "Sign up successful",
        };
    } else {
        return {
            message:
                response.status === 409
                    ? "The user is already existed!"
                    : data?.message || data?.message[0],
        };
    }
}


export async function logout() {
    const session = await getSession()

    if (!session?.accessToken) {
        console.error("No session or access token found");
        return { error: "Unauthorized" };
    }
    try {
        await fetch(
            BACKEND_URL + API_ROUTES.signUp,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.refreshToken}`,
                },
                body: JSON.stringify({
                    csrfId: session.csrfId
                }),
            }
        );
        await deleteSession()
    }
    catch {
        await deleteSession()
    }
}