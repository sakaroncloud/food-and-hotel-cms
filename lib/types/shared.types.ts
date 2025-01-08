/** Basic shared entity fields */
export type TBase = {
    id: string;
    name: string;
};

/** Extended base entity with a slug */
export type TBaseWithSlug = TBase & {
    slug: string;
};



/** Base entity with an optional description */
export type TBaseWithDescription = TBaseWithSlug & {
    description?: string;
};

export type TInTBaseWithDescription = {
    id: number;
    name: string;
    description: string;
    slug: string;
};

/** Shared image type */
export type TImage = TBase & {
    url: string;
};
