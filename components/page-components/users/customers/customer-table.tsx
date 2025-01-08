import { getData } from "@/app/data";
import { DataTable } from "@/components/table/data-table";
import { API_ROUTES } from "@/lib/routes";
import { ResponseWithMeta } from "@/lib/types/response.type";
import { User } from "@/lib/types/user.types";
import { columns } from "./columns";

type Props = {
    showDeleted?: boolean
}

export const CustomerTable = async ({ showDeleted = false }: Props) => {

    const result = await getData<ResponseWithMeta<User.TUser[]>>({
        endPoint: API_ROUTES.user.endpoint + "?role=CUSTOMER",
        tags: ["customers"]
    });

    const filteredData = result?.data.map((user) => (({
        ...user,
        isDeleted: showDeleted,
    })))

    return (
        <DataTable columns={columns} data={filteredData || []} showDeleted={showDeleted} />
    )
}
