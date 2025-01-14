import { EDiscountType, EWeekDay } from "@/schemas/fooding/schema.restaurant";
import { TBaseWithDescription, TImage } from "./shared.types";
import { TAddress } from "./address.types";

export namespace Restaurant {


    // Sub-Namespace for products
    export namespace Product {
        /** Defines a product entity in the restaurant */
        export type TProduct = TBaseWithDescription & {
            description: string;
            price: number;
            preparationTime: number;
            featuredImage?: TImage;
            menus?: Pick<Menu.TMenu, "id" | "name">[];
        };

        export type TProductsResponse = {
            products: TProduct[]
            restaurant: Pick<TRestaurant, "id" | "slug" | "name">
        }
    }
    // Sub-NameSpace for Menus
    export namespace Menu {
        /** Defines a cuisine entity */
        export type TMenu = TBaseWithDescription & {
            products?: Product.TProduct[];
        };
        export type TMenusResponse = {
            menus: TMenu[]
            restaurant: Pick<TRestaurant, "id" | "slug" | "name">
        }
    }

    export namespace Cuisine {
        export type TCuisine = TBaseWithDescription & {
            description: string;
            featuredImage?: TImage;
            restaurants: TRestaurant[];
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
        featuredImage?: TImage;
        commissionPercentage: number; // admin-only field
        address?: TAddress;
        dayOfWeek: EWeekDay[];
        openingTime: string;
        closingTime: string;
        cuisines?: Omit<Cuisine.TCuisine, "featuredImage" | "restaurants" | "slug">[];
        createdAt: string;
        totalProducts: number;
        totalMenus: number;
        totalCuisines: number;
        totalUploads: number;
    };

    export type TRestaurant = Omit<TSingleRestaurant, "featuredImage" | "hasGlobalOffer" | "cuisines" | "totalProducts" | "totalMenus" | "totalCuisines" | "totalUploads"> & {

    }
}