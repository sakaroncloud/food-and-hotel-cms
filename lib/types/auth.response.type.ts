import { Role } from "./user.types";


export type TLoginResponse = {
    id: string;
    firstName: string;
    lastName: string;
    role: Role;
    tokens: {
        accessToken: string;
        refreshToken?: string;
        limitError?: string;
        csrfId?: string;
    };
};