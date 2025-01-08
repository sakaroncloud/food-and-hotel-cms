import { MenuForm } from '@/components/page-components/restaurants/pages/menus/menu-form'
import { CreatePageWrapper } from '@/components/providers/create-page-wrapper'
import { TParams } from '@/lib/types/global.type'
import { getIDsFromSlug } from '@/lib/utils/utils'
import { notFound } from 'next/navigation'



const AddMenuPage = async ({ params }: TParams) => {
    const { restaurantSlug } = await params



    return (
        <CreatePageWrapper title='Add New Menu'>
            <MenuForm restaurantSlug={restaurantSlug} />
        </CreatePageWrapper>
    )
}

export default AddMenuPage