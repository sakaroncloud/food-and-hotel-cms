export enum Role {
    ADMIN = "ADMIN",
    EDITOR = "EDITOR",
    USER = "USER",
}
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