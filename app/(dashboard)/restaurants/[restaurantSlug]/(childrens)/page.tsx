import { RestaurantBody } from '@/components/page-components/restaurants/restaurant-overview/restaurant-body/restaurant-body'
import SingleRestaurantProvider from '@/components/page-components/restaurants/single-restaurant-provider'
import { getIDsFromSlug } from '@/lib/utils/utils'
import { notFound } from 'next/navigation'


type Props = {
    params: Promise<{ restaurantSlug: string }>
}

const SingleRestaurantOverviewPage = async ({ params }: Props) => {
    const restaurantSlug = (await params).restaurantSlug

    const { restaurantId, slugTempered } = getIDsFromSlug({
        restaurantSlug
    })

    if (!restaurantId || slugTempered) {
        notFound()
    }
    return (
        <SingleRestaurantProvider restaurantSlug={restaurantSlug}>
            <RestaurantBody restaurantId={restaurantId} />
        </SingleRestaurantProvider>
    )
}

export default SingleRestaurantOverviewPage