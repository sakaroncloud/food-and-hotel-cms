import { PropertyBasicForm } from '@/components/page-components/properties/form/property-basic-form'
import { CreatePageWrapper } from '@/components/providers/create-page-wrapper'

const AddNewPropertyPage = () => {
    return (
        <CreatePageWrapper title='Add New Property'>
            <PropertyBasicForm />
        </CreatePageWrapper>
    )
}

export default AddNewPropertyPage