"use client"
import { DataTable } from '@/components/table/data-table'
import React from 'react'
import { useFetch } from '@/hooks/useFetch';
import { ResponseWithMeta, ResponseWithNoMeta, TCity, TCuisine } from '@/lib/types/response.type';
import { API_ROUTES } from '@/lib/routes';
import { columns } from './columns';

export const CityTable = () => {

    const { data: result } = useFetch<ResponseWithNoMeta<TCity[]>>({
        endPoint: API_ROUTES.city.endpoint,
        queryKey: API_ROUTES.city.queryKey,
    });
    return (
        <DataTable columns={columns} data={result?.data || []} />)
}
