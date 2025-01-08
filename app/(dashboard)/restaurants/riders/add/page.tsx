import { CreatePageWrapper } from '@/components/providers/create-page-wrapper'
import { DashboardProvider } from '@/components/providers/dashboard-wrapper'
import React from 'react'

const AddRiderPage = () => {
    return (
        <DashboardProvider>
            <CreatePageWrapper title='Add New Rider'>
                <div className="bg-white rounded-xl p-6">
                    <h2 className="text-xl">Development in progress</h2>
                </div>
            </CreatePageWrapper>
        </DashboardProvider>
    )
}

export default AddRiderPage