import { DataTable } from '@/components/table/data-table'
import React from 'react'
import { columns } from './columns'
import { ResponseWithMeta } from '@/lib/types/response.type';
import { API_ROUTES } from '@/lib/routes';
import { getData } from '@/app/data';
import { Restaurant } from '@/lib/types/restaurant.types';

type Props = {
    showDeleted?: boolean
}

export const RestaurantTable = async ({ showDeleted }: Props) => {

    const result = await getData<ResponseWithMeta<Restaurant.TRestaurant[]>>({
        endPoint: API_ROUTES.restaurant.endpoint + "?deleted=" + showDeleted,
        tags: ["restaurant"]
    });

    const filteredData = result?.data?.map((restaurant) => ({
        ...restaurant,
        isDeleted: showDeleted,
    }))

    return (
        <DataTable columns={columns} data={filteredData || []} showDeleted={showDeleted} />)
}
