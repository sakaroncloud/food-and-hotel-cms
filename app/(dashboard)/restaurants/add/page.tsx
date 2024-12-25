import { RestaurantForm } from '@/components/page-components/restaurants/restaurant-form'
import { CreatePageWrapper } from '@/components/providers/create-page-wrapper'
import { DashboardProvider } from '@/components/providers/dashboard-wrapper'
import React from 'react'


const AddNewRestaurantPage = () => {
    return (
        <DashboardProvider>
            <CreatePageWrapper title='Add New Restaurant'>
                <RestaurantForm />
            </CreatePageWrapper>
        </DashboardProvider>
    )
}

export default AddNewRestaurantPage