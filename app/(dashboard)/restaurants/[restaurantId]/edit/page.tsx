import { EditRestaurantWrapper } from '@/components/page-components/restaurants/edit-restaurant-wrapper'
import { DashboardProvider } from '@/components/providers/dashboard-wrapper'
import { TBreadCrumb } from '@/lib/types/global.type'
import React from 'react'

type Props = {
    params: Promise<{ restaurantId: string }>
}



const EditRestaurantPage = async ({ params }: Props) => {
    const restaurantId = (await params).restaurantId

    const breadcrumb: TBreadCrumb[] = [
        {
            label: "Dashboard",
            link: "/"
        }, {
            label: "Restaurants",
            link: "/restaurantss"
        }, {
            label: restaurantId,
        }
    ]

    return (

        <DashboardProvider breadcrumb={breadcrumb}>
            <EditRestaurantWrapper restaurantId={restaurantId} />
        </DashboardProvider>

    )
}

export default EditRestaurantPage