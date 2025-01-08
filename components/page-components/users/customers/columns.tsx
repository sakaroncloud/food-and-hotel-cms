"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"

import { DataTableColumnHeader } from "@/components/table/column-header"
import FallbackImage from "@/components/fallback-image"
import { useCustomSearchParams } from "@/hooks/useCustomSearchParams"
import { CustomCell } from "@/components/table/custom-cell"
import { useState, useTransition } from "react"
import { deleteForeverHandler, deleteHandler, restoreHandler } from "@/lib/actions/global.action"
import { DeleteButton, DeleteForeverButton, EditButton, RestoreButton, ViewIcon } from "@/components/table/action-button"
import { CustomFormModal } from "@/components/form/custom-form-modal"
import { DialogFooter } from "@/components/ui/dialog"
import { API_ROUTES } from "@/lib/routes"
import toast from "react-hot-toast"
import { User } from "@/lib/types/user.types"

export const columns: ColumnDef<User.TUser & {
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

                return <CustomCell label={"#: " + index.toString()} />;
            },
        },

        {
            accessorKey: "name",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Name" />
            ),
            cell: ({ row }) => {
                const data = row.original
                return (
                    <div className="flex items-center gap-2">
                        <div className="p-1 border border-slate-200 bg-white rounded-lg size-[41px] flex items-center justify-center"> </div>
                        <div className="text-sm font-medium capitalize">{data.firstName + ` ${data.lastName}`}</div>
                    </div>
                )
            }
        },

        {
            accessorKey: "email",
            header: "Email"
        },

        {
            accessorKey: "phone",
            header: "Phone"
        },


        {
            accessorKey: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const data = row.original;
                const [open, setOpen] = useState(false);
                const [pending, startTransition] = useTransition()

                const onDeleteOrRestore = async (method: "delete" | "restore" | "forever") => {
                    const handler = method === "delete" ? deleteHandler : method === "restore" ? restoreHandler : deleteForeverHandler

                    startTransition(async () => {
                        const res = await handler({
                            ENDPOINT: API_ROUTES.restaurant.endpoint,
                            PARAM: data.id
                        })
                        if (res.success == true) {
                            toast.success(res.message)
                            setOpen(false)
                        }
                        else {
                            toast.error(res.message)
                            setOpen(false)
                        }
                    });
                };


                return (
                    <div className="flex gap-2">
                        {data?.isDeleted ?
                            <>
                                <RestoreButton onClick={() => onDeleteOrRestore("restore")} disabled={pending} />
                                <CustomFormModal
                                    open={open}
                                    setOpen={setOpen}
                                    title="Are you absolutely sure"
                                    description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
                                    customButton={<DeleteForeverButton />}
                                >
                                    <DialogFooter>
                                        <Button onClick={() => setOpen(false)} variant="outline">
                                            Cancel
                                        </Button>
                                        <Button disabled={pending} type="button" onClick={() => onDeleteOrRestore("forever")}>
                                            Confirm Delete
                                        </Button>
                                    </DialogFooter>
                                </CustomFormModal>
                            </>
                            : <>
                                <EditButton path={`/users/${data.id}/edit`} />
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
                                        <Button disabled={pending} type="button" onClick={() => onDeleteOrRestore("delete")}>
                                            Confirm Delete
                                        </Button>
                                    </DialogFooter>
                                </CustomFormModal>
                            </>}
                    </div>
                );
            },
        },
    ]
