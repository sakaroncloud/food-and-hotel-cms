import { DashboardProvider } from '@/components/providers/dashboard-wrapper'
import { breadcrumb } from '../../../../../components/page-components/cuisines/data'
import { CreatePageWrapper } from '@/components/providers/create-page-wrapper'
import { CuisineForm } from '@/components/page-components/cuisines/cuisine-form'

export default function CreateCuisinePage() {
    return (
        <DashboardProvider breadcrumb={breadcrumb}>
            <CreatePageWrapper title='Add New Cuisine'>
                <CuisineForm />
            </CreatePageWrapper>
        </DashboardProvider>
    )
}

