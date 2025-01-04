type TOption = {
    endPoint: string;
    param?: string;
    tags: string[];
    query?: {
        key: string,
        value: string
    };
};

import { getSession } from "@/lib/actions/session";
import { BACKEND_URL } from "@/lib/constants";

export const getData = async <T>(options: TOption): Promise<T | null> => {

    let queryString = ""
    if (options.query) {
        queryString = `?${options.query.key}=${options.query.value}`
    }
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

    try {
        const response = await fetch(
            BACKEND_URL + options.endPoint + (options.param ? `/${options.param + queryString}` : queryString),
            optionsWithTags,
        );
        if (!response.ok) {
            return null;
        }

        return await response.json();
    }
    catch (error) {
        return null
    }
};