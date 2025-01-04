import { getData } from '@/app/data'
import { EditRestaurantWrapper } from '@/components/page-components/restaurants/edit-restaurant-wrapper'
import { DashboardProvider } from '@/components/providers/dashboard-wrapper'
import { API_ROUTES } from '@/lib/routes'
import { TParams } from '@/lib/types/global.type'
import { ResponseWithNoMeta } from '@/lib/types/response.type'
import { Restaurant } from '@/lib/types/restaurant.types'
import { parseRestaurantBasicFormFromServer2Client } from '@/lib/utils/restaurant.utils'
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

    const result = await getData<ResponseWithNoMeta<Restaurant.TRestaurant>>({
        endPoint: API_ROUTES.restaurant.endpoint,
        param: restaurantId,
        tags: ["restaurant", restaurantId]
    })

    if (!result?.data) notFound()

    const generalFormValues = parseRestaurantBasicFormFromServer2Client(result?.data)

    if (!generalFormValues) notFound()

    return (
        <DashboardProvider>
            <EditRestaurantWrapper generalFormValues={generalFormValues}
            />
        </DashboardProvider>
    )
}

export default EditRestaurantPage