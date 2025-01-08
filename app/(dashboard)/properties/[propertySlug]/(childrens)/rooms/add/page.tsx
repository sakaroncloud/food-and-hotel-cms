import { RoomBasicForm } from '@/components/page-components/properties/pages/rooms/forms/room-form'
import { CreatePageWrapper } from '@/components/providers/create-page-wrapper'
import { getIDsFromSlug } from '@/lib/utils/utils'
import { notFound } from 'next/navigation'

type Props = {
    params: Promise<{ propertySlug: string }>
}
const AddRoomPage = async ({ params }: Props) => {
    const propertySlug = (await params).propertySlug
    const { propertyId, slugTempered } = getIDsFromSlug({
        propertySlug
    })

    if (!propertyId || slugTempered) {
        notFound()
    }
    return (
        <CreatePageWrapper title='Add New Room'>
            <RoomBasicForm propertyId={propertyId} />
        </CreatePageWrapper>
    )
}

export default AddRoomPage