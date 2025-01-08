
import { DataTable } from '@/components/table/data-table'
import React from 'react'
import { ResponseWithNoMeta } from '@/lib/types/response.type';
import { API_ROUTES } from '@/lib/routes';
import { getData } from '@/app/data';
import { columns } from './columns';
import { Property } from '@/lib/types/property.types';

type Props = {
    propertySlug: string;
}
export const RoomsTable = async ({ propertySlug }: Props) => {

    const propertyId = propertySlug.split("--")?.[1]

    const result = await getData<ResponseWithNoMeta<Property.TRoom[]>>({
        endPoint: API_ROUTES.room.endpoint + "?propertyId=" + propertyId,
        tags: [API_ROUTES.room.queryKey, propertyId]
    });

    if (!result?.data) return null

    const filteredData = result.data.map((room) => {
        return {
            ...room,
            property: {
                id: propertyId,
                slug: propertySlug
            }
        }
    })


    return (
        <DataTable searchKey='name' columns={columns} data={filteredData || []} showPagination={false} />)
}
