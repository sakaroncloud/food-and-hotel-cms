import { getData } from '@/app/data'
import { RoomBasicForm } from '@/components/page-components/properties/pages/rooms/forms/room-form'
import { CreatePageWrapper } from '@/components/providers/create-page-wrapper'
import { API_ROUTES } from '@/lib/routes'
import { Property } from '@/lib/types/property.types'
import { ResponseWithNoMeta } from '@/lib/types/response.type'
import { notFound } from 'next/navigation'
type Props = {
    params: Promise<{ propertySlug: string }>
}
const AddRoomPage = async ({ params }: Props) => {
    const propertySlug = (await params).propertySlug
    const propertyId = propertySlug.split("--")?.[1]
    const result = await getData<ResponseWithNoMeta<Property.TProperty>>({
        endPoint: API_ROUTES.property.endpoint,
        param: propertyId,
        tags: ["property", propertyId]
    });
    if (!result?.data) {
        notFound()
    }
    return (
        <CreatePageWrapper title='Add New Room'>
            <RoomBasicForm propertyId={propertyId} />
        </CreatePageWrapper>
    )
}

export default AddRoomPage