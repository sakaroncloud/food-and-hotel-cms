import { getData } from '@/app/data'
import { EditRoomWrapper } from '@/components/page-components/properties/pages/rooms/edit-room-wrapper'
import { API_ROUTES } from '@/lib/routes'
import { Property } from '@/lib/types/property.types'
import { ResponseWithNoMeta } from '@/lib/types/response.type'
import { getIDsFromPropertyAndRoom, parseRoomAmenitiesFromServerToClient, parseRoomGeneralInfoFromServerToClient, parseRoomRulesFromServerToClient } from '@/lib/utils/property.utils'
import { notFound } from 'next/navigation'
type Props = {
    params: Promise<{ propertySlug: string, roomSlug: string, }>
}
const RoomEditPage = async ({ params }: Props) => {
    const { propertySlug, roomSlug } = await params

    const { propertyId, roomId, slugTempered } = getIDsFromPropertyAndRoom(propertySlug, roomSlug)

    if (slugTempered || propertyId === undefined || roomId === undefined) notFound()

    const result = await getData<ResponseWithNoMeta<Property.TRoom>>({
        endPoint: API_ROUTES.room.endpoint,
        query: {
            key: "propertyID",
            value: propertyId
        },
        param: roomId,
        tags: ["room", roomId]
    })

    if (!result?.data) notFound()

    const generalInfo = parseRoomGeneralInfoFromServerToClient({
        ...result.data,
        propertyID: +propertyId
    })

    if (!generalInfo) notFound()


    const amenities = parseRoomAmenitiesFromServerToClient({
        ...result.data?.amenities,
        propertyID: +propertyId
    })

    const rules = parseRoomRulesFromServerToClient({
        ...result.data?.rules,
        propertyID: +propertyId
    })


    return (
        <EditRoomWrapper generalFormValues={generalInfo} roomId={roomId} roomAmenities={amenities} rules={rules} />
    )
}

export default RoomEditPage