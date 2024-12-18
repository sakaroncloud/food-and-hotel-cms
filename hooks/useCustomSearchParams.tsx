"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useCustomSearchParams = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);
            router.push(pathname + "?" + params.toString(), {
                scroll: false,
            });
            return params.toString();
        },
        [searchParams]
    );

    const deleteQueryString = useCallback(
        (name: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.delete(name);
            router.push(pathname + "?" + params.toString(), {
                scroll: false,
            });
            return params.toString();
        },
        [searchParams, pathname, router]
    );

    return {
        router,
        pathname,
        searchParams,
        createQueryString,
        deleteQueryString,
    };
};