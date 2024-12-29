import { TPropertyAmenitiesServerForm } from "@/schemas/lodging/property-amenities.schema";
import { ELanguage } from "./language.types";
import { TBaseWithDescription } from "./shared.types";

export namespace Property {
    // Main Restaurant Type
    /** Defines the main restaurant entity */
    export type TProperty = TBaseWithDescription & {
        email: string;
        description: string;
        phone: string;
        commissionPercentage: number; // admin-only field
        createdAt: string;
        checkInStartTime: string;
        checkInEndTime: string;
        checkOutTime: string;
        languages: ELanguage[];
        amenities: TPropertyAmenitiesServerForm
    };
}