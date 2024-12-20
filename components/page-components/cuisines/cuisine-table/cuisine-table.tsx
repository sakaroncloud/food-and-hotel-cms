"use client"
import { DataTable } from '@/components/table/data-table'
import React from 'react'
import { columns } from './columns'
import { useFetch } from '@/hooks/useFetch';
import { ResponseWithMeta, TCuisine } from '@/lib/types/response.type';
import { API_ROUTES } from '@/lib/routes';

export const CuisineTable = () => {

    const { data: result } = useFetch<ResponseWithMeta<TCuisine[]>>({
        endPoint: API_ROUTES.cuisine.endpoint,
        queryKey: API_ROUTES.cuisine.queryKey,
    });
    return (
        <DataTable columns={columns} data={result?.data || []} />)
}
