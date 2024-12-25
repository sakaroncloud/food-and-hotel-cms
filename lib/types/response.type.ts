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

export type TProducts = {
    products: TProduct[]
    restaurant: Pick<TRestaurant, "id" | "slug" | "name">
}

export type TMenus = {
    menus: TMenu[]
    restaurant: Pick<TRestaurant, "id" | "slug" | "name">
}

export type TProduct = {
    id: string;
    slug: string;
    name: string;
    description: string,
    featuredImage: {
        id: string;
        url: string;
    };
    price: number;
    preparationTime: number;
    menus?: Pick<TMenu, "id" | "name">[]
};

export type TMenu = {
    id: string;
    name: string;
    products?: TProduct[];
    description: string;
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
    name: string;
    slug: string;
    description: string;
    hasGlobalOffer?: TGlobalOffer;
    email: string | undefined;
    phone: string | undefined;
    isPureVeg: boolean;
    isEnabled: boolean;
    logo?: TImage;
    featuredImage?: TImage;
    commissionPercentage: number; // it is defined for only admin
    address?: TAddress;
    dayOfWeek: EWeekDay[];
    openingTime: string;
    closingTime: string;
    cuisines?: Omit<TCuisine, "featuredImage" | "restaurants" | "slug">[];
    totalProducts: number;
    totalMenus: number;
    createdAt: string;
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
    isEnabled: boolean;
    cuisines?: Omit<TCuisine, "featuredImage" | "restaurants" | "description">[];
};
