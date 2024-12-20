import { EDiscountType, EWeekDay } from "@/schemas/fooding/schema.restaurant";

export type ReturnType = {
    message?: string;
    success?: string;
    errors?: Record<string, unknown>;
};


export type TResponse<TData> = {
    success: boolean;
    data: TData;
    message: string;
    statusCode: number;
};


// ------------- from frontend --------------


export type ResponseWithMeta<T> = {
    success: boolean;
    data: T;
    statusCode: number;
    message: string;
    meta: {
        totalItems: number;
        totalPages: number;
        currentPage: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
};

export type ResponseWithNoMeta<T> = {
    success: boolean;
    data: T;
    statusCode: number;
    message: string;
};

/********************************Restaurant Responses ********************************/

export type TBase = {
    id: string;
    name: string;
    slug: string;
};

export type TImage = {
    id: string;
    name: string;
    url: string;
};

export type TCuisine = TBase & {
    description: string;
    featuredImage: TImage;
    restaurants: TRestaurant[];
};

export type TProduct = {
    id: string;
    name: string;
    isPureVeg: boolean;
    description: string | undefined;
    featuredImage: {
        url: string;
    };
    price: number;
};

export type TMenu = {
    id: string;
    name: string;
    products?: TProduct[];
};


export type TGlobalOffer = {
    heading: string;
    subHeading: string;
    actualValue: number;
    type: EDiscountType;
    maxUpTo: number;
}
export type TRestaurant = {
    id: string;
    slug: string;
    name: string;
    email: string | undefined;
    phone: string | undefined;
    description: string;
    isPureVeg: boolean;
    isOpen: boolean;
    logo?: TImage;
    featuredImage?: TImage;
    commissionPercentage: number;
    address?: TAddress;
    dayOfWeek: EWeekDay[];
    openingTime: string;
    closingTime: string;
    cuisines?: Omit<TCuisine, "featuredImage" | "restaurants" | "slug">[];
    menus?: TMenu[];
    hasGlobalOffer?: TGlobalOffer;
};

export type TCity = {
    id: string;
    slug: string;
    name: string;
    pincodes: string[];
};
export type TAddress = {
    streetOne: string;
    area: string;
    mapLink?: string;
    buildingName?: string;
    floor?: string;
    city: TCity;
};

export type TSingleRestaurant = TRestaurant & {
    menus: TMenu[];
    phone?: string;
    email?: string;
    openingTime: string;
    closingTime: string;
    isOpen: boolean;
    cuisines?: Omit<TCuisine, "featuredImage" | "restaurants" | "description">[];
};
