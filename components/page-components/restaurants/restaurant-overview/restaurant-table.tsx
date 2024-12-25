import { DataTable } from '@/components/table/data-table'
import React from 'react'
import { columns } from '../restaurant-table/columns'
import { ResponseWithMeta, TRestaurant } from '@/lib/types/response.type';
import { API_ROUTES } from '@/lib/routes';
import { getData } from '@/app/data';

export const RestaurantTable = async () => {

    const result = await getData<ResponseWithMeta<TRestaurant[]>>({
        endPoint: API_ROUTES.restaurant.endpoint,
        tags: ["restaurant"]
    });

    return (
        <DataTable columns={columns} data={result?.data || []} />)
}
