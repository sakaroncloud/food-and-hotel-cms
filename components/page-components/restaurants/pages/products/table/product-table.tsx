
import { DataTable } from '@/components/table/data-table'
import React from 'react'
import { columns } from './columns'
import { ResponseWithNoMeta } from '@/lib/types/response.type';
import { API_ROUTES } from '@/lib/routes';
import { getData } from '@/app/data';
import { Restaurant } from '@/lib/types/restaurant.types';
import { getIDsFromSlug } from '@/lib/utils/utils';

type Props = {
    restaurantSlug: string;
}
export const ProductsTable = async ({ restaurantSlug }: Props) => {
    const { restaurantId } = getIDsFromSlug({
        restaurantSlug
    })

    if (!restaurantId) return null

    const result = await getData<ResponseWithNoMeta<Restaurant.Product.TProductsResponse>>({
        endPoint: API_ROUTES.product.endpoint + "?restaurantId=" + restaurantId,
        tags: [API_ROUTES.product.queryKey, restaurantId]
    });

    if (!result?.data || !result.data.products || !result.data.restaurant) return null

    const products = result?.data?.products?.map((product: Restaurant.Product.TProduct) => ({
        ...product,
        restaurant: result.data.restaurant,
    }))

    return (
        <DataTable searchKey='name' columns={columns} data={products || []} showPagination={false} />)
}
