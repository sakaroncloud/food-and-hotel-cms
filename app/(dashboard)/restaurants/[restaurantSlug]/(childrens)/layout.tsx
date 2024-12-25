import SingleRestaurantProvider from "@/components/page-components/restaurants/single-restaurant-provider"
import { DashboardProvider } from "@/components/providers/dashboard-wrapper"

type Props = {
    children: React.ReactNode,
    params: Promise<{ restaurantSlug: string }>
}
const SingleRestaurantLayout = async ({ children, params }: Props) => {
    const { restaurantSlug } = await params

    return (
        <DashboardProvider >
            <SingleRestaurantProvider restaurantSlug={restaurantSlug}>
                {children}
            </SingleRestaurantProvider>
        </DashboardProvider>
    )
}

export default SingleRestaurantLayout