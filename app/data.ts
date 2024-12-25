type TOption = {
    endPoint: string;
    param?: string;
    tags: string[];
};

import { getSession } from "@/lib/actions/session";
import { BACKEND_URL } from "@/lib/constants";

export const getData = async <T>(options: TOption): Promise<T | null> => {
    const session = await getSession()

    const fetchOption: RequestInit = {
        headers: {
            "Authorization": `Bearer ${session?.accessToken || ""}`
        },
        cache: 'force-cache',
        next: {
            tags: options.tags,
            revalidate: 20
        }
    }

    const optionsWithTags = options.tags ? {
        ...fetchOption,
        tags: options.tags
    } : fetchOption

    const response = await fetch(
        BACKEND_URL + options.endPoint + (options.param ? `/${options.param}` : ""),
        optionsWithTags,

    );
    if (!response.ok) {
        return null;
    }
    return await response.json();
};