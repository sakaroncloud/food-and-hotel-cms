import { DataTable } from '@/components/table/data-table'
import React from 'react'
import { columns } from './columns'
import { ResponseWithNoMeta, TProduct, TProducts } from '@/lib/types/response.type';
import { API_ROUTES } from '@/lib/routes';
import { getData } from '@/app/data';

type Props = {
    restaurantSlug: string;
}
export const ProductsTable = async ({ restaurantSlug }: Props) => {

    const result = await getData<ResponseWithNoMeta<TProducts>>({
        endPoint: API_ROUTES.product.endpoint + "?restaurant=" + restaurantSlug,
        tags: [API_ROUTES.product.queryKey, restaurantSlug]
    });

    if (!result?.data || !result.data.products || !result.data.restaurant) return null

    const products = result?.data?.products?.map((product: TProduct) => ({
        ...product,
        restaurant: result.data.restaurant,
    }))


    return (
        <DataTable searchKey='name' columns={columns} data={products || []} showPagination={false} />)
}
