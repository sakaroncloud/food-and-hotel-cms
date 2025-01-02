import { DataTable } from '@/components/table/data-table'
import React from 'react'
import { columns } from './columns'
import { ResponseWithMeta } from '@/lib/types/response.type';
import { API_ROUTES } from '@/lib/routes';
import { getData } from '@/app/data';
import { Property } from '@/lib/types/property.types';

type Props = {
    showDeleted?: boolean
}

export const PropertyTable = async ({ showDeleted }: Props) => {

    const result = await getData<ResponseWithMeta<Property.TProperty[]>>({
        endPoint: API_ROUTES.property.endpoint,
        tags: ["property"]
    });

    const filteredData = result?.data?.map((property) => ({
        ...property,
    }))

    return (
        <DataTable columns={columns} data={filteredData || []} showDeleted={showDeleted} />)
}
