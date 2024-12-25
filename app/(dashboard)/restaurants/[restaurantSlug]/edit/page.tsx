import { EditRestaurantWrapper } from '@/components/page-components/restaurants/edit-restaurant-wrapper'
import { DashboardProvider } from '@/components/providers/dashboard-wrapper'

type Props = {
    params: Promise<{ restaurantSlug: string }>
}



const EditRestaurantPage = async ({ params }: Props) => {
    const restaurantSlug = (await params).restaurantSlug
    return (
        <DashboardProvider>
            <EditRestaurantWrapper restaurantSlug={restaurantSlug} />
        </DashboardProvider>
    )
}

export default EditRestaurantPage