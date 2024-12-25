import { DataTable } from '@/components/table/data-table'
import React from 'react'
import { ResponseWithNoMeta, } from '@/lib/types/response.type';
import { API_ROUTES } from '@/lib/routes';
import { columns } from './columns';
import { getData } from '@/app/data';
import { TCity } from '@/lib/types/address.types';

export const CityTable = async () => {
    const result = await getData<ResponseWithNoMeta<TCity[]>>({
        endPoint: API_ROUTES.city.endpoint,
        tags: ["city"]
    })

    return (
        <DataTable columns={columns} data={result?.data || []} />)
}
