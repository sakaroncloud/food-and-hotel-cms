import { DashboardProvider } from "@/components/providers/dashboard-wrapper"
import { TableWrapperWithFilter } from "@/components/table/table-wrapper-with-filter"
import { AddItemButton } from "@/components/uploads/add-item-button"
import { breadcrumb } from "@/components/page-components/cuisines/data"
import { CuisineSearchForm } from "@/components/page-components/cuisines/cuisine-search-form"
import { CuisineTable } from "@/components/page-components/cuisines/cuisine-table/cuisine-table"


const CuisinesPage = () => {
  return (
    <DashboardProvider breadcrumb={breadcrumb}>
      <TableWrapperWithFilter title="Cuisines" headerActions={
        <div className="flex gap-6 items-center">
          <CuisineSearchForm placeholder="Enter Cuisine" />
          <AddItemButton label="Add New" path={`/cuisines/add`} />
        </div>
      } >
        <CuisineTable />
      </TableWrapperWithFilter>
    </DashboardProvider>
  )
}

export default CuisinesPage