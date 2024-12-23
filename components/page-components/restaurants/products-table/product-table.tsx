"use client"
import { DataTable } from '@/components/table/data-table'
import React from 'react'
import { columns } from './columns'
import { useFetch } from '@/hooks/useFetch';
import { ResponseWithNoMeta, TProduct, TProducts, TRestaurant } from '@/lib/types/response.type';
import { API_ROUTES } from '@/lib/routes';

type Props = {
    restaurantSlug: string;
}
export const ProductsTable = ({ restaurantSlug }: Props) => {

    const { data: result, isFetching } = useFetch<ResponseWithNoMeta<TProducts>>({
        endPoint: API_ROUTES.product.endpoint + "?restaurant=" + restaurantSlug,
        queryKey: API_ROUTES.product.queryKey + restaurantSlug,
    });

    if (!result?.data || !result.data.products || !result.data.restaurant) return null

    const products = result?.data?.products?.map((product: TProduct) => ({
        ...product,
        restaurant: result.data.restaurant
    }))

    if (isFetching) return "loading"

    if (!isFetching && !result?.data) return "not found"

    return (
        <DataTable columns={columns} data={products || []} showPagination={false} />)
}
