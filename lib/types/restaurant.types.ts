import { EDiscountType, EWeekDay } from "@/schemas/fooding/schema.restaurant";
import { TBaseWithDescription, TImage, TInTBaseWithDescription } from "./shared.types";
import { TAddress } from "./address.types";
import { TAsyncGallery } from "./upload.type";

export namespace Restaurant {


    // Sub-Namespace for products
    export namespace Product {
        /** Defines a product entity in the restaurant */
        export type TProduct = {
            id: number;
            name: string;
            slug: string;
            description: string;
            price: number;
            preparationTime: number;
            bannerImage?: TImage;
            menus?: Pick<Menu.TMenu, "id" | "name">[];
        };

        export type TProductsResponse = {
            products: TProduct[]
            restaurant: Pick<TRest, "id" | "slug" | "name">
        }
    }
    // Sub-NameSpace for Menus
    export namespace Menu {
        /** Defines a cuisine entity */
        export type TMenu = TInTBaseWithDescription & {
            products?: Product.TProduct[];
            totalProducts?: number;
        };
        export type TMenusResponse = {
            menus: TMenu[]
            restaurant: Pick<TRest, "id" | "slug" | "name">
        }
    }

    export namespace Cuisine {
        export type TCuisine = TBaseWithDescription & {
            description: string;
            bannerImage?: TImage;
            restaurants: TRest[];
        };
    }


    // Global Offer Definition
    /** Represents a global discount or offer */
    export type TGlobalOffer = {
        heading: string;
        subHeading: string;
        actualValue: number;
        type: EDiscountType;
        maxUpTo: number;
    };

    // Main Restaurant Type
    /** Defines the main restaurant entity */
    export type TSingleRestaurant = TBaseWithDescription & {
        hasGlobalOffer?: TGlobalOffer;
        description: string;
        email?: string;
        phone: string;
        isPureVeg: boolean;
        isEnabled: boolean;
        logo?: TImage;
        bannerImage?: TImage;
        commissionPercentage: number; // admin-only field
        address?: TAddress;
        dayOfWeek: EWeekDay[];
        openingTime: string;
        closingTime: string;
        cuisines?: Omit<Cuisine.TCuisine, "bannerImage" | "restaurants" | "slug">[];
        createdAt: string;
        totalProducts: number;
        totalMenus: number;
        totalCuisines: number;
        totalUploads: number;
        galleries?: TAsyncGallery;

    };

    export type TRest = Omit<TSingleRestaurant, | "totalProducts" | "totalMenus" | "totalCuisines" | "totalUploads"> & {

    }
}