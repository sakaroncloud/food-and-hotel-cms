import { DashboardProvider } from "@/components/providers/dashboard-wrapper"
import { TableWrapperWithFilter } from "@/components/table/table-wrapper-with-filter"
import { AddItemButton, ShowTrashOrViewButton } from "@/components/uploads/add-item-button"
// import { TableSearchForm } from "@/components/table/table-search-form"
import { RestaurantTable } from "@/components/page-components/restaurants/restaurant-table/restaurant-table"

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const AllRestaurantsPage = async ({ searchParams }: Props) => {
    const params = await searchParams

    return (
        <DashboardProvider >
            <TableWrapperWithFilter title={params.deleted === "true" ? "Restaurants (Trash)" : "Restaurants"} headerActions={
                <div className="flex gap-4 items-center">
                    {/* <TableSearchForm placeholder="Search Restaurant" /> */}
                    <AddItemButton label="Add New" path={`/restaurants/add`} />
                    <ShowTrashOrViewButton path={`/restaurants`} showDeleted={params?.deleted === "true"} />
                </div>
            } >
                <RestaurantTable showDeleted={params?.deleted === "true"} />
            </TableWrapperWithFilter>
        </DashboardProvider>
    )
}

export default AllRestaurantsPage