import { DashboardProvider } from "@/components/providers/dashboard-wrapper"
import { TableWrapperWithFilter } from "@/components/table/table-wrapper-with-filter"
import { AddItemButton } from "@/components/uploads/add-item-button"
import { TableSearchForm } from "@/components/table/table-search-form"
import { CuisineTable } from "@/components/page-components/cuisines/cuisine-table/cuisine-table"
import { RestaurantTable } from "@/components/page-components/restaurants/restaurant-table/restaurant-table"

const breadcrumb = [
    {
        label: "Dashboard",
        link: "/"
    }, {
        label: "Restaurants",
        link: "/restaurants"
    }
]

const AllRestaurantsPage = () => {
    return (
        <DashboardProvider breadcrumb={breadcrumb}>
            <TableWrapperWithFilter title="Restaurants" headerActions={
                <div className="flex gap-6 items-center">
                    <TableSearchForm placeholder="Enter Restaurant" />
                    <AddItemButton label="Add New" path={`/restaurants/add`} />
                </div>
            } >
                <RestaurantTable />
            </TableWrapperWithFilter>
        </DashboardProvider>
    )
}

export default AllRestaurantsPage