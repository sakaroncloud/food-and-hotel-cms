"use client"

import { cn } from "@/lib/utils/utils"
import { useState } from "react"

type Props = {
    activeTab: number;
    setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

export const PropertyNavTabs = ({ activeTab, setActiveTab }: Props) => {
    const tabs = [
        {
            label: "General Info",
            value: "general"
        },
        {
            label: "Amenities",
            value: "amenities"
        },
        {
            label: "Nearest Locations",
            value: "nearestLocations"
        },
        {
            label: "Rules",
            value: "rules"
        },

        {
            label: "Gallery",
            value: "gallery"
        }
    ]

    return (

        <div className="flex items-center justify-between gap-4 p-4 bg-white shadow-md rounded-xl">
            {tabs.map((tab, i) => {
                return (
                    <div onClick={() => setActiveTab(i)} key={tab.value} className="flex  items-center gap-x-2 w-full">
                        <div className="flex items-center gap-x-2 cursor-pointer">
                            <div className={cn("rounded-full size-6 bg-primary text-xs  flex items-center justify-center text-white bg-gray-300", activeTab === i && "bg-primary")}>
                                {i + 1}
                            </div> <div className={cn("flex-1 ", activeTab === i ? "text-primary" : "text-gray-700")}>
                                {tab.label}
                            </div >
                        </div>
                        {(i < (tabs.length - 1)) && <div className="h-[0.5px] flex-1 bg-gray-200" />

                        }
                    </div>
                )
            })}
        </div>
    )
}

