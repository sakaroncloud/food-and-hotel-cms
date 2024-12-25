import { MenusTable } from '@/components/page-components/restaurants/pages/menus/table/menu-table'
import { MenuAddModalButton } from '@/components/page-components/restaurants/pages/menus/table/product-add-button'
import { TableWrapperWithFilter } from '@/components/table/table-wrapper-with-filter'

type Props = {
    params: Promise<{ restaurantSlug: string }>
}
const RestaurantMenusPage = async ({ params }: Props) => {
    const restaurantSlug = (await params).restaurantSlug
    return (
        <TableWrapperWithFilter title='Menus'
            headerActions={<div className="flex gap-6 items-center">
                <MenuAddModalButton restaurantSlug={restaurantSlug} />
            </div>}
        >
            <MenusTable restaurantSlug={restaurantSlug} />
        </TableWrapperWithFilter>
    )
}

export default RestaurantMenusPage