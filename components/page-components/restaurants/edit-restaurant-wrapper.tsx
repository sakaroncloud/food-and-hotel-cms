"use client"
import { CreatePageWrapper } from '@/components/providers/create-page-wrapper'
import { useFetch } from '@/hooks/useFetch'
import { ResponseWithNoMeta } from '@/lib/types/response.type'
import { API_ROUTES } from '@/lib/routes'
import { RestaurantForm } from './restaurant-form'
import { TRestaurantForm } from '@/schemas/fooding/schema.restaurant'
import dayjs from 'dayjs'
import { Restaurant } from '@/lib/types/restaurant.types'

type Props = {
    restaurantSlug: string
}


export const EditRestaurantWrapper = ({ restaurantSlug }: Props) => {

    const { data: result, isFetching } = useFetch<ResponseWithNoMeta<Restaurant.TRestaurant>>({
        endPoint: API_ROUTES.restaurant.endpoint,
        param: restaurantSlug,
        queryKey: API_ROUTES.restaurant.queryKey,
    });

    if (isFetching && !result?.data) return "loading"
    if ((!isFetching && !result?.data)) return "not found"
    if (!isFetching && !result) return "something went wrong"

    const parseData = (restaurant: Restaurant.TRestaurant | undefined): TRestaurantForm | undefined => {
        if (restaurant) {
            const parsedRestaurantForForm: TRestaurantForm = {
                // we have to parse only those data, which are in object or in array - eg : select fields
                ...restaurant,
                description: restaurant?.description || "",
                cuisines: restaurant?.cuisines?.map((cuisine) => ({ value: cuisine.id, label: cuisine.name })) || [],
                dayOfWeek: restaurant?.dayOfWeek?.map((day) => ({ value: day, label: day })) || [],
                featuredImage: restaurant?.featuredImage?.id,
                logo: restaurant?.logo?.id,
                openingTime: dayjs(restaurant?.openingTime, "HH:mm").format('HH:mm'),
                closingTime: dayjs(restaurant?.closingTime, "HH:mm").format('HH:mm'),
                email: restaurant?.email || "",
            }
            return parsedRestaurantForForm
        }
        return undefined
    }


    const formValues = parseData(result?.data)
    if (!formValues) return null

    return (

        <CreatePageWrapper title='Edit Restaurant'>


            {result && <RestaurantForm formValues={{
                ...formValues,
                id: result.data.id,
                slug: restaurantSlug
            }}

                defaultFeaturedImage={result?.data?.featuredImage ? [{ id: result?.data.featuredImage.id, url: result?.data.featuredImage.url }] : []}
                defaultLogo={result?.data?.featuredImage ? [{ id: result?.data.featuredImage.id, url: result?.data.featuredImage.url }] : []}
            />


            }
        </CreatePageWrapper>

    )
}

