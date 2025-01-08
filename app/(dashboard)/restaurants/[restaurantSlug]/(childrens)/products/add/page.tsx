import { ProductForm } from '@/components/page-components/restaurants/pages/products/product-form'
import { CreatePageWrapper } from '@/components/providers/create-page-wrapper'
import { TParams } from '@/lib/types/global.type'




const AddProductPage = async ({ params }: TParams) => {
    const { restaurantSlug } = await params



    return (
        <CreatePageWrapper title='Add New Product'>
            <ProductForm restaurantSlug={restaurantSlug} />
        </CreatePageWrapper>
    )
}

export default AddProductPage