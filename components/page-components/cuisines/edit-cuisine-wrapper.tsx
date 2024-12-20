"use client"
import { DashboardProvider } from '@/components/providers/dashboard-wrapper'
import { CuisineForm } from '@/components/page-components/cuisines/cuisine-form'
import { CreatePageWrapper } from '@/components/providers/create-page-wrapper'
import { TBreadCrumb } from '@/lib/types/global.type'
import { useFetch } from '@/hooks/useFetch'
import { ResponseWithNoMeta, TCuisine } from '@/lib/types/response.type'
import { API_ROUTES } from '@/lib/routes'

type Props = {
    slug: string
}


export const EditCuisineWrapper = ({ slug }: Props) => {
    const breadcrumb: TBreadCrumb[] = [
        {
            label: "Dashboard",
            link: "/"
        }, {
            label: "Cuisines",
            link: "/cuisines"
        }, {
            label: slug,
        }
    ]

    const { data: result } = useFetch<ResponseWithNoMeta<TCuisine>>({
        endPoint: API_ROUTES.cuisine.endpoint,
        param: slug,
        queryKey: API_ROUTES.cuisine.queryKey,
    });

    if (!result?.data) return null

    return (
        <DashboardProvider breadcrumb={breadcrumb}>
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

