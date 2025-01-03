import { TPropertyAmenities } from "@/schemas/lodging/property/property-amenities.schema";
import { ELanguage } from "./language.types";
import { TBaseWithDescription } from "./shared.types";
import { TPropertyRules, TPropertyRulesClientForm } from "@/schemas/lodging/property/property-rules.schema";
import { TAsyncGallery } from "./upload.type";
import { TAddress } from "./address.types";
import { TRoomAmenities } from "@/schemas/lodging/room/room-amenities.schema";
import { TRoomRules } from "@/schemas/lodging/room/room-rules.schema";
export enum EBedType {
    KING_BED = "King Bed",
    DOUBLE_BED = "Double Bed",
    SINGLE_BED = "Single Bed",
    QUADRUPLE_BED = "Quadruple Bed",
    HALF_DOUBLE_BED = "Half Double Bed",
    FULL_BED = "Full Bed",
    KITCHEN_BED = "Kitchen Bed",
    BURGER_BED = "Burger Bed",
}



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
        amenities?: TPropertyAmenities;
        rules?: TPropertyRules;
        nearestLocations?: TPropertyLocation[];
        galleries?: TAsyncGallery;
        uploads?: TAsyncGallery;
        address?: TAddress;
        totalRooms: number;
    };

    export type TRoom = TBaseWithDescription & {
        price: number;
        length: number;
        width: number;
        beds: {
            type: EBedType;
            quantity: number;
        }[],
        amenities?: TRoomAmenities;
        rules?: TRoomRules
    }

    export type TPropertyLocation = {
        name: string;
        distance: number;
    }
}