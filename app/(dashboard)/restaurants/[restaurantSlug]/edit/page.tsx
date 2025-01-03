import { EditRestaurantWrapper } from '@/components/page-components/restaurants/edit-restaurant-wrapper'
import { DashboardProvider } from '@/components/providers/dashboard-wrapper'
import { TParams } from '@/lib/types/global.type'
import { getIDsFromSlug } from '@/lib/utils/utils'




const EditRestaurantPage = async ({ params }: TParams) => {
    const { restaurantSlug } = (await params)

    const { restaurantID } = getIDsFromSlug({
        restaurantSlug
    })

    return (
        <DashboardProvider>
            <EditRestaurantWrapper />
        </DashboardProvider>
    )
}

export default EditRestaurantPage