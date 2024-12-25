"use client"
import { DataTable } from '@/components/table/data-table'
import React from 'react'
import { columns } from './columns'
import { useFetch } from '@/hooks/useFetch';
import { ResponseWithMeta } from '@/lib/types/response.type';
import { API_ROUTES } from '@/lib/routes';
import { Restaurant } from '@/lib/types/restaurant.types';

export const CuisineTable = () => {

    const { data: result } = useFetch<ResponseWithMeta<Restaurant.Cuisine.TCuisine[]>>({
        endPoint: API_ROUTES.cuisine.endpoint,
        queryKey: API_ROUTES.cuisine.queryKey,
    });
    return (
        <DataTable columns={columns} data={result?.data || []} />)
}
