import { MenusTable } from '@/components/page-components/restaurants/pages/menus/table/menu-table'
import { MenuAddModalButton } from '@/components/page-components/restaurants/pages/menus/table/product-add-button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils/utils'
import Link from 'next/link'

type Props = {
    params: Promise<{ restaurantSlug: string }>
}
const RestaurantMenusPage = async ({ params }: Props) => {
    const restaurantSlug = (await params).restaurantSlug
    return (

        <div className="space-y-6 relative">
            <div className=" w-full bg-white shadow border rounded-lg relative">
                <header
                    className={cn(
                        "flex justify-between items-center relative py-4 px-6",
                    )}
                >
                    <ToggleGroup type="single" defaultValue='menus' className='data-[state=on]:text-primary'>
                        <ToggleGroupItem asChild value="products" aria-label="Toggle products" className=' data-[state=on]:text-primary'>
                            <Link href={`/restaurants/${restaurantSlug}/products`}>
                                Products
                            </Link>
                        </ToggleGroupItem>
                        <ToggleGroupItem asChild value="menus" aria-label="Toggle menus" className='data-[state=on]:text-primary'>
                            <Link href={`/restaurants/${restaurantSlug}/menus`}>
                                Menus
                            </Link>
                        </ToggleGroupItem>

                    </ToggleGroup>
                    <MenuAddModalButton restaurantSlug={restaurantSlug} />
                    <div className="absolute w-1 rounded-lg bg-primary h-[50%] top-1/2 -translate-y-1/2 left-0 -translate-x-1/2" />
                </header>


            </div>
            <div className="bg-white rounded-lg py-0 px-6">
                <MenusTable restaurantSlug={restaurantSlug} />        </div>
        </div>

    )
}

export default RestaurantMenusPage