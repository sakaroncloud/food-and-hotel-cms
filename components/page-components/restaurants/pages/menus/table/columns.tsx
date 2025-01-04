"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"

import { DataTableColumnHeader } from "@/components/table/column-header"

import { useCustomSearchParams } from "@/hooks/useCustomSearchParams"
import { CustomCell } from "@/components/table/custom-cell"
import { useState, useTransition } from "react"
import { deleteHandler } from "@/lib/actions/global.action"
import { DeleteButton, EditButton, } from "@/components/table/action-button"
import { CustomFormModal } from "@/components/form/custom-form-modal"
import { DialogFooter } from "@/components/ui/dialog"
import { API_ROUTES } from "@/lib/routes"
import toast from "react-hot-toast"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { MenuFormModal } from "../menu-form-modal"
import { Restaurant } from "@/lib/types/restaurant.types"

export const columns: ColumnDef<Restaurant.Menu.TMenu & {
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

                return <CustomCell label={index.toString()} />;
            },
        },

        {
            accessorKey: "name",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Name" />
            ),
            cell: ({ row }) => {
                return (
                    <CustomCell label={row.original.name} />
                )
            }
        },

        {
            accessorKey: "description",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Description" />
            ),
            cell: ({ row }) => {
                const description = row.original?.description
                if (!description) return null
                return (
                    <CustomCell label={description.slice(0, 50) + "..."} />
                )
            }
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
                            ENDPOINT: API_ROUTES.menu.endpoint,
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
                        <EditButton
                            onClick={() => setOpenEdit(true)}
                        >
                            Open Edit
                        </EditButton>

                        {openEdit && (
                            <MenuFormModal
                                key={data.id}
                                label="Edit Menu"
                                restaurantSlug={data.restaurant.slug}
                                formDescription="Make change to the menu here"
                                openModal={openEdit}
                                setOpenModal={setOpenEdit}
                                formValues={{
                                    id: data?.id || "",
                                    description: data?.description || "",
                                    name: data?.name || "",
                                    restaurant: data.restaurant.slug,
                                }}
                            />
                        )}

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
