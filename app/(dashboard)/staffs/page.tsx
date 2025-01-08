import { StaffTable } from "@/components/page-components/users/staffs/staff-table"
import { DashboardProvider } from "@/components/providers/dashboard-wrapper"
// import { TableSearchForm } from "@/components/table/table-search-form"
import { TableWrapperWithFilter } from "@/components/table/table-wrapper-with-filter"
import { AddItemButton, ShowTrashOrViewButton } from "@/components/uploads/add-item-button"

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const StaffsPage = async ({ searchParams }: Props) => {
    const params = await searchParams
    return (
        <DashboardProvider >
            <TableWrapperWithFilter title={params.deleted === "true" ? "Staffs (Trash)" : "Staffs"} headerActions={
                <div className="flex gap-4 items-center flex-1 justify-end">
                    {/* <TableSearchForm placeholder="Search by name/email/phone" /> */}
                    <AddItemButton label="Add New" path={`/staffs/add`} />
                    <ShowTrashOrViewButton path={`/staffs`} showDeleted={params?.deleted === "true"} />
                </div>
            } >
                <StaffTable showDeleted={params?.deleted === "true"}

                />
            </TableWrapperWithFilter>
        </DashboardProvider>
    )
}

export default StaffsPage