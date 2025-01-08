import { getData } from "@/app/data";
import { DataTable } from "@/components/table/data-table";
import { API_ROUTES } from "@/lib/routes";
import { Order } from "@/lib/types/order.types";
import { ResponseWithMeta } from "@/lib/types/response.type";
import { columns } from "./columns";


type Props = {
    showDeleted?: boolean
}

export const OrderTable = async ({ showDeleted }: Props) => {

    const result = await getData<ResponseWithMeta<Order.TOrder[]>>({
        endPoint: API_ROUTES.order.endpoint,
        tags: ["orders"]
    });


    return (
        <DataTable columns={columns} data={result?.data || []} showDeleted={showDeleted}
        />
    )

}
