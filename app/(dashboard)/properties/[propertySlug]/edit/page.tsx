import { getData } from '@/app/data'
import { EditPropertyWrapper } from '@/components/page-components/properties/edit-property-wrapper'
import { API_ROUTES } from '@/lib/routes'
import { Property } from '@/lib/types/property.types'
import { ResponseWithNoMeta } from '@/lib/types/response.type'
import { parsePAddressFromS2C, parsePAmenitiesFromS2C, parsePLocationsFromS2C, parsePropertyGalleryFromS2C, parsePRulesFromS2C } from '@/lib/utils/property.utils'
import { TPropertyBasicForm } from '@/schemas/lodging/property/property-basic.schema'
import { notFound } from 'next/navigation'
type Props = {
    params: Promise<{ propertySlug: string }>
}

const EditPropertyPage = async ({ params }: Props) => {
    const propertySlug = (await params).propertySlug
    const propertyId = propertySlug.split("--")?.[1]

    if (!propertyId) notFound()
    const result = await getData<ResponseWithNoMeta<Property.TProperty>>({
        endPoint: API_ROUTES.property.endpoint,
        param: propertyId,
        tags: ["property", propertyId]
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

    const aminities = parsePAmenitiesFromS2C(result.data?.amenities)
    const rules = parsePRulesFromS2C(result.data?.rules)
    const locations = parsePLocationsFromS2C(result.data?.nearestLocations)

    const address = parsePAddressFromS2C(result.data?.address)
    const galleries = result.data.galleries




    return (
        <EditPropertyWrapper address={address} galleries={galleries} generalFormValues={generalData} amenities={aminities} rules={rules} nearestLocations={locations} />
    )
}

export default EditPropertyPage