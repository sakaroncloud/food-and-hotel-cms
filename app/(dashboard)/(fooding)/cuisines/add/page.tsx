"use client"
import { DashboardProvider } from '@/components/providers/dashboard-wrapper'
import { breadcrumb } from '../_components/data'
import { CuisineForm } from '@/components/page-components/cuisines/cuisine-form'
import { CreatePageWrapper } from '@/components/providers/create-page-wrapper'

const CreateCuisinePage = () => {
    return (
        <DashboardProvider breadcrumb={breadcrumb}>

            <CreatePageWrapper title='Add New Cuisine'>
                <CuisineForm />
            </CreatePageWrapper>

        </DashboardProvider>
    )
}

export default CreateCuisinePage