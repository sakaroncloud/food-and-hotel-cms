import { TBaseWithSlug } from "./shared.types";

export type TCity = TBaseWithSlug & {
    pincodes: string[];
    totalAddresses: number;
};

export type TAddress = {
    streetOne: string;
    area: string;
    mapLink?: string;
    buildingName?: string;
    floor?: string;
    city: TCity;
};
