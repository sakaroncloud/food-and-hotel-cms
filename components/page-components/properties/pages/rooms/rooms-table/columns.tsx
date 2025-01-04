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
import { Property } from "@/lib/types/property.types"


export const columns: ColumnDef<Property.TRoom & {
    property: Pick<Property.TProperty, "id" | "slug">
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
                const queryClient = useQueryClient()
                const [pending, startTransition] = useTransition()

                const onDelete = async () => {
                    startTransition(async () => {
                        const res = await deleteHandler({
                            ENDPOINT: API_ROUTES.room.endpoint,
                            PARAM: data.id + "?property=" + data.property?.id
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
                        queryClient.invalidateQueries()
                    });

                };
                return (
                    <div className="flex gap-2">
                        <ViewIcon path={`/properties/${data.property.slug}/rooms/${data.slug}`} />
                        <EditButton
                            path={`/properties/${data.property.slug}/rooms/${data.slug}/edit`}
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
