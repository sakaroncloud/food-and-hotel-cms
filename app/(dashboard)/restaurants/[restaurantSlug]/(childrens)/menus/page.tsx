import { MenusTable } from '@/components/page-components/restaurants/pages/menus/table/menu-table'
import { AddItemButton } from '@/components/uploads/add-item-button'
import { cn, getIDsFromSlug } from '@/lib/utils/utils'
import { notFound } from 'next/navigation'


type Props = {
    params: Promise<{ restaurantSlug: string }>
}
const RestaurantMenusPage = async ({ params }: Props) => {
    const restaurantSlug = (await params).restaurantSlug
    const { restaurantId } = getIDsFromSlug({
        restaurantSlug
    })

    if (!restaurantId) {
        notFound()
    }
    return (
        <div className="space-y-5 relative">
            <div className=" w-full bg-white shadow border rounded-lg relative">
                <header
                    className={cn(
                        "flex justify-between items-center relative py-4 px-6",
                    )}
                >
                    <span>Menus</span>
                    <AddItemButton
                        path={`/restaurants/${restaurantSlug}/menus/add`}
                        label='Add New'
                    />
                    <div className="absolute w-1 rounded-lg bg-primary h-[50%] top-1/2 -translate-y-1/2 left-0 -translate-x-1/2" />
                </header>
            </div>
            <div className="bg-white rounded-lg py-0 px-6">
                <MenusTable restaurantSlug={restaurantSlug} />
            </div>
        </div>
    )
}

export default RestaurantMenusPage