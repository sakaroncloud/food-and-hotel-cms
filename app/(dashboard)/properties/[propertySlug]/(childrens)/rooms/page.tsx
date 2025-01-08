import { RoomsTable } from '@/components/page-components/properties/pages/rooms/rooms-table/rooms-table'
import { AddItemButton } from '@/components/uploads/add-item-button'
import { cn } from '@/lib/utils/utils'

type Props = {
    params: Promise<{ propertySlug: string }>
}
const PropertyRoomsPage = async ({ params }: Props) => {
    const propertySlug = (await params).propertySlug
    return (
        <div className="space-y-5 relative">
            <div className=" w-full bg-white shadow border rounded-lg relative">
                <header
                    className={cn(
                        "flex justify-between items-center relative py-4 px-6",
                    )}
                >
                    <span>Rooms</span>
                    <AddItemButton
                        path={`/properties/${propertySlug}/rooms/add`}
                        label='Add New'
                    />
                    <div className="absolute w-1 rounded-lg bg-primary h-[50%] top-1/2 -translate-y-1/2 left-0 -translate-x-1/2" />
                </header>
            </div>
            <div className="bg-white rounded-lg py-0 px-6">
                <RoomsTable propertySlug={propertySlug} />
            </div>
        </div>
    )
}

export default PropertyRoomsPage