"use client"

import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"


import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { DataTableViewOptions } from "./column-visibility-toggle"
import { cn } from "@/lib/utils/utils"



interface DataTableToolbarProps<TData> {
    table: Table<TData>,
    searchKey?: string;
    searchLabel?: string;
    apiSearchKey?: string;
    showViewColumn?: boolean;

    facetedFilters?: {
        title: string,
        options: {
            label: string
            value: string
            icon?: React.ComponentType<{ className?: string }>
        }[]
    }
}

export function DataTableToolbar<TData>({
    table, facetedFilters,
    searchKey, apiSearchKey,
    searchLabel,
    showViewColumn
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0

    return (
        <div className={cn("flex items-center justify-between py-5", !showViewColumn && "py-1")}>
            <div className="flex flex-1 items-center space-x-2">
                {searchKey && searchKey.length > 0 && <Input
                    placeholder={searchLabel || `Filter by ${searchKey}`}
                    value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn(searchKey)?.setFilterValue(event.target.value)
                    }
                    className="max-w-xs"
                />}
                {
                    facetedFilters?.title && (
                        table.getColumn("priority") && (
                            <DataTableFacetedFilter
                                column={table.getColumn("priority")}
                                title="Priority"
                                options={facetedFilters.options}
                            />
                        )
                    )
                }

                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <X />
                    </Button>
                )}
            </div>
            {showViewColumn && <DataTableViewOptions table={table} />}
        </div>
    )
}