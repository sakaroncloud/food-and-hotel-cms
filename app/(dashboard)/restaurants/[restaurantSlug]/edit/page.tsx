import { getData } from '@/app/data'
import { EditRestaurantWrapper } from '@/components/page-components/restaurants/edit-restaurant-wrapper'
import { DashboardProvider } from '@/components/providers/dashboard-wrapper'
import { API_ROUTES } from '@/lib/routes'
import { TParams } from '@/lib/types/global.type'
import { ResponseWithNoMeta } from '@/lib/types/response.type'
import { Restaurant } from '@/lib/types/restaurant.types'
import { parseAddressFromS2C } from '@/lib/utils/address.utils'
import { parseRestBasicFormFromS2C, parseRestCuisineFromS2C } from '@/lib/utils/restaurant.utils'
import { getIDsFromSlug } from '@/lib/utils/utils'
import { notFound } from 'next/navigation'




const EditRestaurantPage = async ({ params }: TParams) => {
    const { restaurantSlug } = (await params)

    const { restaurantId, slugTempered } = getIDsFromSlug({
        restaurantSlug
    })

    if (!restaurantId || slugTempered) {
        notFound()
    }

    const result = await getData<ResponseWithNoMeta<Restaurant.TRest>>({
        endPoint: API_ROUTES.restaurant.endpoint,
        param: restaurantId,
        tags: ["restaurant", restaurantId]
    })

    if (!result?.data) notFound()

    const generalFormValues = parseRestBasicFormFromS2C(result?.data)

    if (!generalFormValues) notFound()

    const cuisines = parseRestCuisineFromS2C(result?.data)
    const brandings = {
        logo: result?.data?.logo,
        bannerImage: result?.data?.bannerImage
    }
    const galleries = result.data?.galleries
    const address = parseAddressFromS2C(result.data?.address)

    return (
        <DashboardProvider>
            <EditRestaurantWrapper generalFormValues={generalFormValues}
                cuisines={cuisines}
                brandings={brandings}
                galleries={galleries}
                address={address}
            />
        </DashboardProvider>
    )
}

export default EditRestaurantPage