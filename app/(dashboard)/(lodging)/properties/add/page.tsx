import { PropertyBasicForm } from '@/components/page-components/properties/property-basic-form'
import { CreatePageWrapper } from '@/components/providers/create-page-wrapper'
import { DashboardProvider } from '@/components/providers/dashboard-wrapper'

const AddNewPropertyPage = () => {
    return (
        <DashboardProvider>
            <CreatePageWrapper title='Add New Property'>
                <PropertyBasicForm />
            </CreatePageWrapper>
        </DashboardProvider>
    )
}

export default AddNewPropertyPage