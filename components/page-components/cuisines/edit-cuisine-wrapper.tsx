"use client"
import { DashboardProvider } from '@/components/providers/dashboard-wrapper'
import { CuisineForm } from '@/components/page-components/cuisines/cuisine-form'
import { CreatePageWrapper } from '@/components/providers/create-page-wrapper'
import { useFetch } from '@/hooks/useFetch'
import { ResponseWithNoMeta } from '@/lib/types/response.type'
import { API_ROUTES } from '@/lib/routes'
import { Restaurant } from '@/lib/types/restaurant.types'

type Props = {
    cuisineSlug: string
}


export const EditCuisineWrapper = ({ cuisineSlug }: Props) => {


    const { data: result } = useFetch<ResponseWithNoMeta<Restaurant.Cuisine.TCuisine>>({
        endPoint: API_ROUTES.cuisine.endpoint,
        param: cuisineSlug,
        queryKey: API_ROUTES.cuisine.queryKey,
    });

    if (!result?.data) return null

    return (
        <DashboardProvider >
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
        </DashboardProvider>
    )
}

