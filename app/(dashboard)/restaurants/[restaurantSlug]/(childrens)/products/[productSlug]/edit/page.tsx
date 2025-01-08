import { CreatePageWrapper } from '@/components/providers/create-page-wrapper'
import React from 'react'
import { getData } from '@/app/data'
import { API_ROUTES } from '@/lib/routes'
import { ResponseWithNoMeta } from '@/lib/types/response.type'
import { notFound } from 'next/navigation'
import { Restaurant } from '@/lib/types/restaurant.types'
import { getIDsFromSlug } from '@/lib/utils/utils'
import { ProductForm } from '@/components/page-components/restaurants/pages/products/product-form'
import { productS2CSchema, TProductForm } from '@/schemas/fooding/schema.product'
import { parseProductFromS2C } from '@/lib/utils/restaurant.utils'

type Props = {
    params: Promise<{ restaurantSlug: string, productSlug: string }>
}

const EditProductPage = async ({ params }: Props) => {
    const { restaurantSlug, productSlug } = await params

    const { restaurantId, productId, slugTempered } = getIDsFromSlug({
        restaurantSlug,
        productSlug
    })
    if (!restaurantId || slugTempered || !productId) {
        notFound()
    }


    const result = await getData<ResponseWithNoMeta<Restaurant.Product.TProduct>>({
        endPoint: API_ROUTES.product.endpoint,
        query: {
            key: "restaurantId",
            value: restaurantId
        },
        param: productId,
        tags: ["product", productId]
    })



    if (!result?.data) {
        notFound()
    }
    console.log(result.data)
    const product = parseProductFromS2C(result.data, +restaurantId)


    return (
        <CreatePageWrapper title='Edit Product'>
            <ProductForm
                formValues={product}
                productId={productId}
                restaurantSlug={restaurantSlug}
            />
        </CreatePageWrapper>
    )
}

export default EditProductPage