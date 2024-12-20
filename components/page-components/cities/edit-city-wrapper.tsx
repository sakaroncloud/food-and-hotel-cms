"use client"
import { DashboardProvider } from '@/components/providers/dashboard-wrapper'
import { CreatePageWrapper } from '@/components/providers/create-page-wrapper'
import { TBreadCrumb } from '@/lib/types/global.type'
import { useFetch } from '@/hooks/useFetch'
import { ResponseWithNoMeta, TCity, TCuisine } from '@/lib/types/response.type'
import { API_ROUTES } from '@/lib/routes'
import { CityForm } from './city-form'

type Props = {
    slug: string
}


export const EditCityWrapper = ({ slug }: Props) => {
    const breadcrumb: TBreadCrumb[] = [
        {
            label: "Dashboard",
            link: "/"
        }, {
            label: "Cities",
            link: "/cities"
        }, {
            label: slug,
        }
    ]

    const { data: result } = useFetch<ResponseWithNoMeta<TCity>>({
        endPoint: API_ROUTES.city.endpoint,
        param: slug,
        queryKey: API_ROUTES.city.queryKey,
    });

    if (!result?.data) return null


    return (
        <DashboardProvider breadcrumb={breadcrumb}>
            <CreatePageWrapper title='Edit City'>
                <CityForm
                    formValues={
                        {
                            ...result?.data,
                            pincodes: result?.data?.pincodes?.map((pincode) => ({ id: pincode, text: pincode })) || []
                        }
                    }
                />
            </CreatePageWrapper>
        </DashboardProvider>
    )
}

