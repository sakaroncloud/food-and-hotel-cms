import { DashboardProvider } from '@/components/providers/dashboard-wrapper'
import { CreatePageWrapper } from '@/components/providers/create-page-wrapper'
import { CityForm } from '@/components/page-components/cities/city-form'



export default function CreateCityPage() {
    return (
        <DashboardProvider >
            <CreatePageWrapper title='Add New City'>
                <CityForm />
            </CreatePageWrapper>
        </DashboardProvider>
    )
}

