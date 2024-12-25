import { ProductsTable } from '@/components/page-components/restaurants/pages/products/table/product-table'
import { TableWrapperWithFilter } from '@/components/table/table-wrapper-with-filter'
import { AddItemButton } from '@/components/uploads/add-item-button'

type Props = {
    params: Promise<{ restaurantSlug: string }>
}
const RestaurantProductsPage = async ({ params }: Props) => {
    const restaurantSlug = (await params).restaurantSlug
    return (

        <TableWrapperWithFilter title='Products'
            headerActions={<div className="flex gap-6 items-center">
                <AddItemButton
                    path={`/restaurants/${restaurantSlug}/products/add`}
                    label='Add New'
                />
            </div>}
        >
            <ProductsTable restaurantSlug={restaurantSlug} />
        </TableWrapperWithFilter>
    )
}

export default RestaurantProductsPage