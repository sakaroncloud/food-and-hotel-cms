"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"

import { DataTableColumnHeader } from "@/components/table/column-header"
import { BACKEND_URL } from "@/lib/constants"
import FallbackImage from "@/components/fallback-image"
import { useCustomSearchParams } from "@/hooks/useCustomSearchParams"
import { CustomCell } from "@/components/table/custom-cell"
import { useState, useTransition } from "react"
import { deleteHandler } from "@/lib/actions/global.action"
import { DeleteButton, EditButton, ViewIcon } from "@/components/table/action-button"
import { CustomFormModal } from "@/components/form/custom-form-modal"
import { DialogFooter } from "@/components/ui/dialog"
import { API_ROUTES } from "@/lib/routes"
import toast from "react-hot-toast"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { Restaurant } from "@/lib/types/restaurant.types"
import { TableBadge } from "@/components/table/table-badge"

export const columns: ColumnDef<Restaurant.Product.TProduct & {
    restaurant: Pick<Restaurant.TRest, "id" | "slug">
}>[] = [

        {
            accessorKey: "id",
            header: "SN",
            cell: ({ row }) => {
                const { searchParams } = useCustomSearchParams();
                const page = parseInt(searchParams.get("page") || "1");
                const take = 10;
                const index = row.index + 1 + (page - 1) * take;
                return <CustomCell label={"#SN: " + index.toString()} />;
            },
        },

        {
            accessorKey: "name",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Name" />
            ),
            cell: ({ row }) => {
                const image = row.original?.bannerImage?.url
                return (
                    <div className="flex items-center gap-2">
                        <div className="p-1 border border-slate-200 bg-white rounded-lg size-[41px] flex items-center justify-center">
                            <FallbackImage type="square" src={image || "/"} alt={row.original.name} width={40} height={40} errorMessage="No Image" errorClassName="h-10 w-10 text-xs text-primary" className="rounded-lg object-cover h-full w-full" />
                        </div>
                        <div className="text-sm font-medium capitalize">{row.original.name}</div>
                    </div>
                )
            }
        },

        {
            accessorKey: "menus",
            header: "Menus",
            cell: ({ row }) => {
                const data = row.original?.menus;
                return <div className="flex flex-wrap gap-2 max-w-[300px]">
                    {data?.map((menu) => <TableBadge key={menu.id} label={menu.name} />)}
                </div>
            }
        },

        {
            accessorKey: "price",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Price" />
            ),
        },

        {
            accessorKey: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const data = row.original;
                const router = useRouter()
                const [open, setOpen] = useState(false);
                const [openEdit, setOpenEdit] = useState(false);
                const queryClient = useQueryClient()
                const [pending, startTransition] = useTransition()

                const onDelete = async () => {
                    startTransition(async () => {
                        const res = await deleteHandler({
                            ENDPOINT: API_ROUTES.product.endpoint,
                            PARAM: data.id + "?restaurant=" + data.restaurant?.slug
                        })
                        if (res.success == true) {
                            toast.success(res.message)
                            setOpen(false)
                            router.refresh()
                        }
                        else {
                            toast.error(res.message)
                            setOpen(false)
                        }
                        queryClient.invalidateQueries({ queryKey: [API_ROUTES.product.queryKey + data.restaurant.slug] })
                    });

                };
                return (
                    <div className="flex gap-2">
                        <ViewIcon path={`/restaurants/${data.restaurant.slug}/products/${data.slug}`} />
                        <EditButton
                            path={`/restaurants/${data.restaurant.slug}/products/${data.slug}/edit`}
                        >
                            Open Edit
                        </EditButton>



                        <CustomFormModal
                            open={open}
                            setOpen={setOpen}
                            title="Are you absolutely sure"
                            description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
                            customButton={<DeleteButton />}
                        >
                            <DialogFooter>
                                <Button onClick={() => setOpen(false)} variant="outline">
                                    Cancel
                                </Button>
                                <Button disabled={pending} type="button" onClick={onDelete}>
                                    Confirm Delete
                                </Button>
                            </DialogFooter>
                        </CustomFormModal>
                    </div>
                );
            },
        },
    ]
