import { DashboardProvider } from '@/components/providers/dashboard-wrapper'
import { CreatePageWrapper } from '@/components/providers/create-page-wrapper'
import { CityForm } from '@/components/page-components/cities/city-form'

const breadcrumb = [
    {
        label: "Dashboard",
        link: "/"
    }, {
        label: "Cities",
        link: "/cities"
    }, {
        label: "Add New",
    }
]

export default function CreateCityPage() {
    return (
        <DashboardProvider breadcrumb={breadcrumb}>
            <CreatePageWrapper title='Add New City'>
                <CityForm />
            </CreatePageWrapper>
        </DashboardProvider>
    )
}

