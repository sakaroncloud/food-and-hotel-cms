import { DataTable } from '@/components/table/data-table'
import React from 'react'
import { columns } from './columns'
import { ResponseWithNoMeta } from '@/lib/types/response.type';
import { API_ROUTES } from '@/lib/routes';
import { getData } from '@/app/data';
import { Restaurant } from '@/lib/types/restaurant.types';

type Props = {
    restaurantSlug: string;
}
export const MenusTable = async ({ restaurantSlug }: Props) => {

    const result = await getData<ResponseWithNoMeta<Restaurant.Menu.TMenusResponse>>({
        endPoint: API_ROUTES.menu.endpoint + "?restaurant=" + restaurantSlug,
        tags: [API_ROUTES.menu.queryKey, restaurantSlug]
    });

    if (!result?.data || !result.data.menus || !result.data.restaurant) return null

    const menus = result?.data?.menus?.map((menu: Restaurant.Menu.TMenu) => ({
        ...menu,
        restaurant: result.data.restaurant
    }))

    return (
        <DataTable searchKey='name' columns={columns} data={menus || []} showPagination={false} />)
}
