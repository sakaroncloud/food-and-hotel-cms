"use client"

import { useState } from "react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { TPropertyBasicForm } from "@/schemas/lodging/property/property-basic.schema"
import { cn } from "@/lib/utils/utils"

import { TAddressForm } from "@/schemas/schema.address"
import { TAsyncGallery } from "@/lib/types/upload.type"
import { MultiStepTabs } from "@/components/form/multi-step-tabs"

type Props = {
    generalFormValues?: TPropertyBasicForm & { id: string, slug: string };
    galleries?: TAsyncGallery;
    address?: TAddressForm;
}


export const EditRestaurantWrapper = ({ address, galleries, generalFormValues, }: Props) => {
    const [activeTab, setActiveTab] = useState(0)

    const tabs = [
        {
            label: "General Info",
            value: "general",
            published: true
        },
        {
            label: "Cuisines",
            value: "cuisines",
            published: false,
        },
        {
            label: "Logo",
            value: "logo",
            published: false,
        },

        {
            label: "Gallery",
            value: "gallery",
            published: false,
        },


        {
            label: "Offers",
            value: "offers",
            published: false,
        },

        {
            label: "Address",
            value: "address",
            published: false,
        }
    ]


    // if (!generalFormValues) {
    //     notFound()
    // }

    return (
        <div className="space-y-6">
            <MultiStepTabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
            <ScrollArea className="px-4 h-[calc(100vh-200px)]">
                <ScrollBar />
                <div className={cn("hidden", activeTab == 0 && "block")}>
                </div>
                <div className={cn("hidden", activeTab == 1 && "block")}>

                </div>
                <div className={cn("hidden", activeTab == 2 && "block")}>

                </div>
                <div className={cn("hidden", activeTab == 3 && "block")}>

                </div>
                <div className={cn("hidden", activeTab == 4 && "block")}>

                </div>

                <div className={cn("hidden", activeTab == 5 && "block")}>

                </div>
            </ScrollArea>
        </div>

    )
}

