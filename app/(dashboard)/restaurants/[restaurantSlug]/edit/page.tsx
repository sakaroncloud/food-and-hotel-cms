import { EditRestaurantWrapper } from '@/components/page-components/restaurants/edit-restaurant-wrapper'
import { DashboardProvider } from '@/components/providers/dashboard-wrapper'
import { TBreadCrumb } from '@/lib/types/global.type'
import React from 'react'

type Props = {
    params: Promise<{ restaurantSlug: string }>
}



const EditRestaurantPage = async ({ params }: Props) => {
    const restaurantSlug = (await params).restaurantSlug

    const breadcrumb: TBreadCrumb[] = [
        {
            label: "Dashboard",
            link: "/"
        }, {
            label: "Restaurants",
            link: "/restaurants"
        }, {
            label: restaurantSlug,
            link: `/restaurants/${restaurantSlug}`
        }, {
            label: "Edit"
        }
    ]

    return (

        <DashboardProvider breadcrumb={breadcrumb}>
            <EditRestaurantWrapper restaurantSlug={restaurantSlug} />
        </DashboardProvider>

    )
}

export default EditRestaurantPage