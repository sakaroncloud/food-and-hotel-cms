import { RestaurantForm } from '@/components/page-components/restaurants/restaurant-form'
import { CreatePageWrapper } from '@/components/providers/create-page-wrapper'
import { DashboardProvider } from '@/components/providers/dashboard-wrapper'
import React from 'react'

const breadcrumb = [
    {
        label: "Dashboard",
        link: "/"
    }, {
        label: "Restaurants",
        link: "/restaurants"
    }
]

const AddNewRestaurantPage = () => {
    return (
        <DashboardProvider breadcrumb={breadcrumb}>
            <CreatePageWrapper title='Add New Restaurant'>
                <RestaurantForm />
            </CreatePageWrapper>
        </DashboardProvider>
    )
}

export default AddNewRestaurantPage