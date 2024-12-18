"use client"
import { DashboardProvider } from "@/components/providers/dashboard-wrapper"
import { columns } from "./_components/columns"
import { DataTable } from "@/components/table/data-table"
import { useFetch } from "@/hooks/useFetch"
import { ResponseWithMeta, TCuisine } from "@/lib/types/response.type"
import { API_ROUTES } from "@/lib/routes"
import { breadcrumb } from "./_components/data"
import { CuisineSearchForm } from "./_components/cuisine-search-form"
import { TableWrapperWithFilter } from "@/components/table/table-wrapper-with-filter"
import { AddItemButton } from "@/components/uploads/add-item-button"


const CuisinesPage = () => {
  const { data: result } = useFetch<ResponseWithMeta<TCuisine[]>>({
    endPoint: API_ROUTES.cuisine,
    queryKey: "cuisines",
  });

  return (
    <DashboardProvider breadcrumb={breadcrumb}>
      <TableWrapperWithFilter title="Cuisines" headerActions={
        <div className="flex gap-6 items-center">
          <CuisineSearchForm placeholder="Enter Cuisine" />
          <AddItemButton label="Add New" path={`/cuisines/add`} />
        </div>
      } >
        <DataTable columns={columns} data={result?.data || []} />
      </TableWrapperWithFilter>
    </DashboardProvider>
  )
}

export default CuisinesPage