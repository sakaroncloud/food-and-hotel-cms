import { CuisineForm } from '@/components/page-components/cuisines/cuisine-form'
import { CreatePageWrapper } from '@/components/providers/create-page-wrapper'
import { ResponseWithNoMeta } from '@/lib/types/response.type'
import { API_ROUTES } from '@/lib/routes'
import { Restaurant } from '@/lib/types/restaurant.types'
import { notFound } from 'next/navigation'
import { getData } from '@/app/data'

type Props = {
    cuisineSlug: string
}


export const EditCuisineWrapper = async ({ cuisineSlug }: Props) => {

    const result = await getData<ResponseWithNoMeta<Restaurant.Cuisine.TCuisine>>({
        endPoint: API_ROUTES.cuisine.endpoint,
        param: cuisineSlug,
        tags: ["cuisine", cuisineSlug]
    });

    if (!result?.data) {
        notFound()
    }

    return (

        <CreatePageWrapper title='Edit Cuisine'>
            <CuisineForm
                formValues={
                    {
                        ...result?.data,
                        id: result?.data?.slug,
                        featuredImage: result?.data?.featuredImage?.id
                    }
                }
                defaultImages={result?.data?.featuredImage ? [{ id: result?.data.featuredImage.id, url: result?.data.featuredImage.url }] : []}
            />
        </CreatePageWrapper>
    )
}

