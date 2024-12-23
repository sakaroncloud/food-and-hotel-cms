import { ProductsTable } from '@/components/page-components/restaurants/products-table/product-table'
import SingleRestaurantProvider from '@/components/page-components/restaurants/single-restaurant-provider'
import { DashboardProvider } from '@/components/providers/dashboard-wrapper'
import { TBreadCrumb } from '@/lib/types/global.type'
import React from 'react'

type Props = {
    params: Promise<{ restaurantSlug: string }>
}
const RestaurantProductsPage = async ({ params }: Props) => {
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
            label: "Products"
        }
    ]
    return (
        <DashboardProvider breadcrumb={breadcrumb}>
            <SingleRestaurantProvider restaurantSlug={restaurantSlug}>
                <ProductsTable restaurantSlug={restaurantSlug} />
            </SingleRestaurantProvider>
        </DashboardProvider>
    )
}

export default RestaurantProductsPage