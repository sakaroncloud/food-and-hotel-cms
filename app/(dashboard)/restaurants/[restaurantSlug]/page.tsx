import { RestaurantBody } from '@/components/page-components/restaurants/restaurant-overview/restaurant-body'
import SingleRestaurantProvider from '@/components/page-components/restaurants/single-restaurant-provider'
import { DashboardProvider } from '@/components/providers/dashboard-wrapper'
import { TBreadCrumb } from '@/lib/types/global.type'
import React from 'react'

type Props = {
    params: Promise<{ restaurantSlug: string }>
}

const SingleRestaurantOverviewPage = async ({ params }: Props) => {
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
        }
    ]

    return (
        <DashboardProvider breadcrumb={breadcrumb}>
            <SingleRestaurantProvider restaurantSlug={restaurantSlug}>
                <RestaurantBody restaurantSlug={restaurantSlug} />
            </SingleRestaurantProvider>
        </DashboardProvider>
    )
}

export default SingleRestaurantOverviewPage