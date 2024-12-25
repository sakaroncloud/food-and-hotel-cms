import { CreatePageWrapper } from '@/components/providers/create-page-wrapper'
import React from 'react'
import { ProductForm } from '../../_components/product-form'
import { getData } from '@/app/data'
import { API_ROUTES } from '@/lib/routes'
import { ResponseWithNoMeta } from '@/lib/types/response.type'
import { notFound } from 'next/navigation'
import { Restaurant } from '@/lib/types/restaurant.types'

type Props = {
    params: Promise<{ restaurantSlug: string, productSlug: string }>
}

const EditProductPage = async ({ params }: Props) => {
    const { restaurantSlug, productSlug } = await params

    const result = await getData<ResponseWithNoMeta<Restaurant.Product.TProduct>>({
        endPoint: API_ROUTES.product.endpoint,
        param: productSlug,
        tags: ["product", productSlug]
    })

    if (!result?.data) {
        notFound()
    }

    const product = result.data

    return (
        <CreatePageWrapper title='Edit Product'>
            <ProductForm
                formValues={{
                    ...product,
                    menus: product?.menus?.map((menu) => ({ value: menu.id, label: menu.name })) || [],
                    featuredImage: product?.featuredImage?.id,
                    restaurant: restaurantSlug
                }}
                defaultFeaturedImage={product?.featuredImage ? [{ id: product.featuredImage.id, url: product.featuredImage.url }] : []}
                restaurantSlug={restaurantSlug} />
        </CreatePageWrapper>
    )
}

export default EditProductPage