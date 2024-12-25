import { DashboardProvider } from '@/components/providers/dashboard-wrapper'
import { CreatePageWrapper } from '@/components/providers/create-page-wrapper'
import { ResponseWithNoMeta, } from '@/lib/types/response.type'
import { API_ROUTES } from '@/lib/routes'
import { CityForm } from './city-form'
import { getData } from '@/app/data'
import { TCity } from '@/lib/types/address.types'

type Props = {
    slug: string
}


export const EditCityWrapper = async ({ slug }: Props) => {


    const result = await getData<ResponseWithNoMeta<TCity>>({
        endPoint: API_ROUTES.city.endpoint,
        param: slug,
        tags: ["city", slug]
    });

    if (!result?.data) return null


    return (
        <DashboardProvider >
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

