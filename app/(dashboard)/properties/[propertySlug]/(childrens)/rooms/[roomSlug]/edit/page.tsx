import { getData } from '@/app/data'
import { EditRoomWrapper } from '@/components/page-components/properties/pages/rooms/edit-room-wrapper'
import { API_ROUTES } from '@/lib/routes'
import { Property } from '@/lib/types/property.types'
import { ResponseWithNoMeta } from '@/lib/types/response.type'
import { parseRoomAmenitiesFromServer2Client, parseRoomGeneralInfoFromServer2Client, parseRoomRulesFromServer2Client } from '@/lib/utils/property.utils'
import { getIDsFromSlug } from '@/lib/utils/utils'
import { notFound } from 'next/navigation'
type Props = {
    params: Promise<{ propertySlug: string, roomSlug: string, }>
}
const RoomEditPage = async ({ params }: Props) => {
    const { propertySlug, roomSlug } = await params

    const { propertyID, roomID, slugTempered } = getIDsFromSlug({
        propertySlug,
        roomSlug,
    })

    if (slugTempered || propertyID === undefined || roomID === undefined) notFound()

    const result = await getData<ResponseWithNoMeta<Property.TRoom>>({
        endPoint: API_ROUTES.room.endpoint,
        query: {
            key: "propertyID",
            value: propertyID
        },
        param: roomID,
        tags: ["room", roomID]
    })

    if (!result?.data) notFound()

    const generalInfo = parseRoomGeneralInfoFromServer2Client({
        ...result.data,
        propertyID: +propertyID
    })

    if (!generalInfo) notFound()


    const amenities = parseRoomAmenitiesFromServer2Client({
        ...result.data?.amenities,
        propertyID: +propertyID
    })

    const rules = parseRoomRulesFromServer2Client({
        ...result.data?.rules,
        propertyID: +propertyID
    })

    const galleries = result.data?.galleries

    return (
        <EditRoomWrapper generalFormValues={generalInfo} roomId={roomID} roomAmenities={amenities} rules={rules}
            galleries={galleries}
        />
    )
}

export default RoomEditPage