import { CreatePageWrapper } from '@/components/providers/create-page-wrapper'
import React from 'react'
import { getData } from '@/app/data'
import { API_ROUTES } from '@/lib/routes'
import { ResponseWithNoMeta } from '@/lib/types/response.type'
import { notFound } from 'next/navigation'
import { Restaurant } from '@/lib/types/restaurant.types'
import { getIDsFromSlug } from '@/lib/utils/utils'
import { MenuForm } from '@/components/page-components/restaurants/pages/menus/menu-form'
import { TParams } from '@/lib/types/global.type'
import { parseMenuFromS2C } from '@/lib/utils/restaurant.utils'



const EditMenuPage = async ({ params }: TParams) => {
    const { restaurantSlug, menuSlug } = await params

    const { restaurantId, menuId, slugTempered } = getIDsFromSlug({
        restaurantSlug,
        menuSlug
    })

    if (!restaurantId || slugTempered || !menuId) {
        notFound()
    }


    const result = await getData<ResponseWithNoMeta<Restaurant.Menu.TMenu>>({
        endPoint: API_ROUTES.menu.endpoint,
        query: {
            key: "restaurantId",
            value: restaurantId
        },
        param: menuId,
        tags: ["menu", menuId]
    })



    if (!result?.data) {
        notFound()
    }

    const menu = parseMenuFromS2C(result.data, +restaurantId)


    return (
        <CreatePageWrapper title='Edit Menu'>
            <MenuForm
                formValues={menu}
                restaurantSlug={restaurantSlug}
                menuId={menuId}
            />
        </CreatePageWrapper>
    )
}

export default EditMenuPage