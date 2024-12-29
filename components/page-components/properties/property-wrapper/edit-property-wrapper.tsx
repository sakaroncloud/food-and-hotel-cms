"use client"

import { useState } from "react"
import { PropertyNavTabs } from "./property-nav-tabs"
import { PropertyBasicForm } from "../property-basic-form"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { TPropertyBasicForm } from "@/schemas/lodging/property-basic.schema"
import { cn } from "@/lib/utils"
import { PropertyAmenityForm } from "../property-amenity-form"

type Props = {
    generalFormValues: TPropertyBasicForm & { id: string, slug: string };
    amenities?: null;
    rules?: null;
    nearestLocations?: null;
}


export const EditPropertyWrapper = ({ amenities, generalFormValues }: Props) => {
    const [activeTab, setActiveTab] = useState(0)

    return (
        <div className="space-y-6">
            <PropertyNavTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <ScrollArea className="px-4 h-[calc(100vh-200px)]">
                <ScrollBar />
                <div className={cn("hidden", activeTab == 0 && "block")}>
                    <PropertyBasicForm setActiveTab={setActiveTab} formValues={generalFormValues} />
                </div>
                <div className={cn("hidden", activeTab == 1 && "block")}>
                    <PropertyAmenityForm
                        formValues={amenities}
                        id={generalFormValues?.id}
                        slug={generalFormValues?.slug}
                    />
                </div>
                <div className={cn("hidden", activeTab == 2 && "block")}>
                    Nearest Locations
                </div>
                <div className={cn("hidden", activeTab == 3 && "block")}>
                    Rules
                </div>
                <div className={cn("hidden", activeTab == 4 && "block")}>
                    Gallery
                </div>
            </ScrollArea>
        </div>

    )
}

