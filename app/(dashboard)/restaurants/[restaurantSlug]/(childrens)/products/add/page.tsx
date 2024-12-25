import { CreatePageWrapper } from '@/components/providers/create-page-wrapper'
import React from 'react'
import { ProductForm } from '../_components/product-form'

type Props = {
    params: Promise<{ restaurantSlug: string }>
}

const AddProductPage = async ({ params }: Props) => {
    const { restaurantSlug } = await params

    return (
        <CreatePageWrapper title='Add New Product'>
            <ProductForm restaurantSlug={restaurantSlug} />
        </CreatePageWrapper>
    )
}

export default AddProductPage