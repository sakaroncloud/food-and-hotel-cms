import { getData } from '@/app/data'
import { EditPropertyWrapper } from '@/components/page-components/properties/property-wrapper/edit-property-wrapper'
import { DashboardProvider } from '@/components/providers/dashboard-wrapper'
import { API_ROUTES } from '@/lib/routes'
import { Property } from '@/lib/types/property.types'
import { ResponseWithNoMeta } from '@/lib/types/response.type'
import { parsePAmenitiesFromServerToClient } from '@/lib/utils/aminities.utils'
import { TPropertyBasicForm } from '@/schemas/lodging/property-basic.schema'
import { notFound } from 'next/navigation'
type Props = {
    params: Promise<{ propertySlug: string }>
}


const EditPropertyPage = async ({ params }: Props) => {
    const propertySlug = (await params).propertySlug

    const propertyID = propertySlug.split("--")?.[1]
    const result = await getData<ResponseWithNoMeta<Property.TProperty>>({
        endPoint: API_ROUTES.property.endPoint,
        param: propertyID,
        tags: ["property", propertyID]
    });

    if (!result?.data) {
        notFound()
    }

    const generalData: TPropertyBasicForm & { id: string, slug: string } = {
        ...result.data,
        languages: result.data.languages.map((language) => ({
            label: language.charAt(0).toUpperCase() + language.slice(1).toLowerCase(),
            value: language
        })),
    }

    const aminities = parsePAmenitiesFromServerToClient(result.data?.amenities)

    return (
        <DashboardProvider>
            <EditPropertyWrapper generalFormValues={generalData} amenities={aminities} />
        </DashboardProvider>
    )
}

export default EditPropertyPage