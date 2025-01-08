
export enum Role {
    ADMIN = 'ADMIN',
    EDITOR = 'EDITOR',
    HOTEL = 'HOTEL',
    CUSTOMER = 'CUSTOMER',
    RIDER = 'RIDER',
}
import { TBase } from "./shared.types";

export namespace User {
    export type TUser = {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phone?: string;
        avatarUrl?: string;
        dob?: string;
        role: Role
    }

}