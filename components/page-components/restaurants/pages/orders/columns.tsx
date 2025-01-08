"use client"
import { ColumnDef } from "@tanstack/react-table"

import { DataTableColumnHeader } from "@/components/table/column-header"
import { useCustomSearchParams } from "@/hooks/useCustomSearchParams"
import { CustomCell } from "@/components/table/custom-cell"

import { Order } from "@/lib/types/order.types"
import { formatDate } from "@/lib/utils/utils"

export const columns: ColumnDef<Order.TOrder & {
    isDeleted?: boolean | undefined
}>[] = [

        {
            accessorKey: "id",
            header: "SN",
            cell: ({ row }) => {
                const { searchParams } = useCustomSearchParams();
                const page = parseInt(searchParams.get("page") || "1");
                const take = 10;
                const index = row.index + 1 + (page - 1) * take;

                return <CustomCell label={"#ORDER: " + index.toString()} />;
            },
        },

        {
            accessorKey: "user",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Name" />
            ),
            cell: ({ row }) => {
                const data = row.original.user
                return (
                    <div className="flex items-center gap-2">
                        <div className="p-1 border border-slate-200 bg-white rounded-lg size-[41px] flex items-center justify-center"> </div>
                        <div className="text-sm font-medium capitalize">{data.firstName + ` ${data.lastName}`}</div>
                    </div>
                )
            }
        },


        {
            accessorKey: "totalItems",
            header: "Total Items"
        },

        {
            accessorKey: "totalAmount",
            header: "Total Amount"
        },


        {
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({ row }) => {
                const data = row.original;
                return (
                    <div className="text-sm font-medium capitalize">{formatDate(data.createdAt, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                    })}</div>
                )
            }
        },

        {
            accessorKey: "paymentStatus",
            header: "Payment Status"
        },


    ]
