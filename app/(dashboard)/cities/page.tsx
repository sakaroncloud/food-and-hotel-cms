import { CityTable } from '@/components/page-components/cities/city-table/city-table'
import { DashboardProvider } from '@/components/providers/dashboard-wrapper'
import { TableSearchForm } from '@/components/table/table-search-form'
import { TableWrapperWithFilter } from '@/components/table/table-wrapper-with-filter'
import { AddItemButton } from '@/components/uploads/add-item-button'
import { TBreadCrumb } from '@/lib/types/global.type'
import React from 'react'

const CitiesPage = () => {

    const breadcrumb: TBreadCrumb[] = [
        {
            label: "Dashboard",
            link: "/"
        }, {
            label: "Cities",
            link: "/cities"
        }, {
            label: "Add New",
        }
    ]

    return (
        <DashboardProvider breadcrumb={breadcrumb}>
            <TableWrapperWithFilter title="Cities" headerActions={
                <div className="flex gap-6 items-center">
                    <TableSearchForm placeholder="Enter Location" />
                    <AddItemButton label="Add New" path={`/cities/add`} />
                </div>
            } >
                <CityTable />
            </TableWrapperWithFilter>
        </DashboardProvider>
    )
}

export default CitiesPage