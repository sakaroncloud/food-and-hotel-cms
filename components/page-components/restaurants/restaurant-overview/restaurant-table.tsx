"use client"
import { DataTable } from '@/components/table/data-table'
import React from 'react'
import { columns } from '../restaurant-table/columns'
import { useFetch } from '@/hooks/useFetch';
import { ResponseWithMeta, TRestaurant } from '@/lib/types/response.type';
import { API_ROUTES } from '@/lib/routes';

export const RestaurantTable = () => {

    const { data: result } = useFetch<ResponseWithMeta<TRestaurant[]>>({
        endPoint: API_ROUTES.restaurant.endpoint,
        queryKey: API_ROUTES.restaurant.queryKey,
    });

    return (
        <DataTable columns={columns} data={result?.data || []} />)
}
