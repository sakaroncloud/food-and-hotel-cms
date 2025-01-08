import { DataTable } from '@/components/table/data-table'
import React from 'react'
import { columns } from './columns'
import { ResponseWithNoMeta } from '@/lib/types/response.type';
import { API_ROUTES } from '@/lib/routes';
import { getData } from '@/app/data';
import { Restaurant } from '@/lib/types/restaurant.types';
import { getIDsFromSlug } from '@/lib/utils/utils';
import { notFound } from 'next/navigation';

type Props = {
    restaurantSlug: string
}
export const MenusTable = async ({ restaurantSlug }: Props) => {

    const { restaurantId } = getIDsFromSlug({
        restaurantSlug
    })

    if (!restaurantId) {
        notFound()
    }

    const result = await getData<ResponseWithNoMeta<Restaurant.Menu.TMenusResponse>>({
        endPoint: API_ROUTES.menu.endpoint + "?restaurantId=" + restaurantId,
        tags: [API_ROUTES.menu.queryKey, restaurantId]
    });


    if (!result?.data || !result.data.menus || !result.data.restaurant) {
        notFound()
    }

    const menus = result?.data?.menus?.map((menu: Restaurant.Menu.TMenu) => ({
        ...menu,
        restaurant: result.data.restaurant
    }))




    return (
        <DataTable searchKey='name' columns={columns} data={menus || []} showPagination={false} />)
}
