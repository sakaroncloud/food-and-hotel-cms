export type TBase = {
    id: string;
    createdAt: string;
};

export type TMeta = {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
};
export type TAsyncUpload = {
    data: TAsyncImage[];
    meta: TMeta;
};

export type TAsyncImage = {
    id: string;
    url: string;
    originalName: string;
    memeType: string;
    size: number;
    height: number;
    width: number;
    uploadedBy: {
        firstName: string;
        lastName: string;
        email: string;
    };
} & TBase;


export type TAsyncGallery = TAsyncImage[]

export type TDefaultImage = {
    id: string;
    url: string
}