import { DashboardProvider } from "@/components/providers/dashboard-wrapper"
import { TableWrapperWithFilter } from "@/components/table/table-wrapper-with-filter"
import { AddItemButton } from "@/components/uploads/add-item-button"
import { TableSearchForm } from "@/components/table/table-search-form"
import { CuisineTable } from "@/components/page-components/cuisines/cuisine-table/cuisine-table"


const CuisinesPage = () => {
  return (
    <DashboardProvider >
      <TableWrapperWithFilter title="Cuisines" headerActions={
        <div className="flex gap-6 items-center">
          <AddItemButton label="Add New" path={`/restaurants/cuisines/add`} />
        </div>
      } >
        <CuisineTable />
      </TableWrapperWithFilter>
    </DashboardProvider>
  )
}

export default CuisinesPage