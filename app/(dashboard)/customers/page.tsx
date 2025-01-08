import { CustomerTable } from "@/components/page-components/users/customers/customer-table"
import { DashboardProvider } from "@/components/providers/dashboard-wrapper"
import { TableSearchForm } from "@/components/table/table-search-form"
import { TableWrapperWithFilter } from "@/components/table/table-wrapper-with-filter"
import { AddItemButton, ShowTrashOrViewButton } from "@/components/uploads/add-item-button"

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const CustomersPage = async ({ searchParams }: Props) => {
    const params = await searchParams
    return (
        <DashboardProvider >
            <TableWrapperWithFilter title={params.deleted === "true" ? "Customers (Trash)" : "Customers"} headerActions={
                <div className="flex gap-4 items-center flex-1 justify-end">
                    <TableSearchForm placeholder="Search by name/email/phone" />
                    <ShowTrashOrViewButton path={`/customers`} showDeleted={params?.deleted === "true"} />
                </div>
            } >
                <CustomerTable showDeleted={params?.deleted === "true"} />
            </TableWrapperWithFilter>
        </DashboardProvider>
    )
}

export default CustomersPage