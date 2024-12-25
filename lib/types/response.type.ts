import { EDiscountType, EWeekDay } from "@/schemas/fooding/schema.restaurant";

export type ReturnType = {
    message?: string;
    success?: string;
    errors?: Record<string, unknown>;
};

type TMeta = {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};

export type TBaseResponse<T> = {
    success: boolean;
    data: T;
    message: string;
    statusCode: number;
};

export type ResponseWithNoMeta<T> = TBaseResponse<T>

// ------------- from frontend --------------


export type ResponseWithMeta<T> = TBaseResponse<T> & {
    meta: TMeta
};


export type TResponse<T, HasMeta extends boolean = false> = HasMeta extends true ? TBaseResponse<T> & { meta: TMeta } : TBaseResponse<T>


/********************************Restaurant Responses ********************************/

// export type TBaseWithSlug = TBase & {
//     slug: string;
// }
// export type TBase = {
//     id: string;
//     name: string;
// };

// export type TImage = TBase & {
//     url: string;
// };

// export type TCuisine = TBaseWithSlug & {
//     description: string;
//     featuredImage?: TImage;
//     restaurants: TRestaurant[];
// };

// export type TProducts = {
//     products: TProduct[]
//     restaurant: Pick<TRestaurant, "id" | "slug" | "name">
// }

// export type TMenus = {
//     menus: TMenu[]
//     restaurant: Pick<TRestaurant, "id" | "slug" | "name">
// }

// export type TProduct = TBaseWithSlug & TImage & {
//     description: string,
//     price: number;
//     preparationTime: number;
//     menus?: Pick<TMenu, "id" | "name">[]
// };

// export type TMenu = TBase & {
//     products?: TProduct[];
//     description: string;
// };

// export type TGlobalOffer = {
//     heading: string;
//     subHeading: string;
//     actualValue: number;
//     type: EDiscountType;
//     maxUpTo: number;
// }
// export type TRestaurant = TBaseWithSlug & {
//     description: string;
//     hasGlobalOffer?: TGlobalOffer;
//     email: string | undefined;
//     phone: string;
//     isPureVeg: boolean;
//     isEnabled: boolean;
//     logo?: TImage;
//     featuredImage?: TImage;
//     commissionPercentage: number; // it is defined for only admin
//     address?: TAddress;
//     dayOfWeek: EWeekDay[];
//     openingTime: string;
//     closingTime: string;
//     cuisines?: Omit<TCuisine, "featuredImage" | "restaurants" | "slug">[];
//     totalProducts: number;
//     totalMenus: number;
//     totalCuisines: number;
//     createdAt: string;
// };


// /********************************Address and City ********************************/

// export type TCity = TBaseWithSlug & {
//     pincodes: string[];
// };

// export type TAddress = {
//     streetOne: string;
//     area: string;
//     mapLink?: string;
//     buildingName?: string;
//     floor?: string;
//     city: TCity;
// };


