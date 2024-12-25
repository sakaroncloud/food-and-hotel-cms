import { RestaurantBody } from '@/components/page-components/restaurants/restaurant-overview/restaurant-body/restaurant-body'


type Props = {
    params: Promise<{ restaurantSlug: string }>
}

const SingleRestaurantOverviewPage = async ({ params }: Props) => {
    const restaurantSlug = (await params).restaurantSlug
    return (
        <RestaurantBody restaurantSlug={restaurantSlug} />
    )
}

export default SingleRestaurantOverviewPage