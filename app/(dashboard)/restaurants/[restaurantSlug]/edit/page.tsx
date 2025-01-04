import { getData } from '@/app/data'
import { EditRestaurantWrapper } from '@/components/page-components/restaurants/edit-restaurant-wrapper'
import { DashboardProvider } from '@/components/providers/dashboard-wrapper'
import { API_ROUTES } from '@/lib/routes'
import { TParams } from '@/lib/types/global.type'
import { ResponseWithNoMeta } from '@/lib/types/response.type'
import { Restaurant } from '@/lib/types/restaurant.types'
import { parseRestBasicFormFromS2C, parseRestBrandingFromS2C, parseRestCuisineFromS2C } from '@/lib/utils/restaurant.utils'
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
    console.log(brandings)

    return (
        <DashboardProvider>
            <EditRestaurantWrapper generalFormValues={generalFormValues}
                cuisines={cuisines}
                brandings={brandings}
            />
        </DashboardProvider>
    )
}

export default EditRestaurantPage