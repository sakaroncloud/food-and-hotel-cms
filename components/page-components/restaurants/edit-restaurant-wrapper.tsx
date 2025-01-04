"use client"

import { useState } from "react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils/utils"

import { TAddressForm } from "@/schemas/schema.address"
import { TAsyncGallery } from "@/lib/types/upload.type"
import { MultiStepTabs } from "@/components/form/multi-step-tabs"
import { TRestaurantBasicForm } from "@/schemas/fooding/restaurant/restaurant-basic.schema"
import { notFound } from "next/navigation"
import { RestaurantBasicForm } from "./forms/restaurant-basic-form"
import { RestaurantCuisineForm } from "./forms/restaurant-cuisine-form"
import { result } from "lodash"
import { TRestaurantCuisineForm } from "@/schemas/fooding/restaurant/restaurant-cuisine.schema"

type Props = {
    generalFormValues: TRestaurantBasicForm & { id: number };
    galleries?: TAsyncGallery;
    address?: TAddressForm;
    cuisines?: TRestaurantCuisineForm;
}


export const EditRestaurantWrapper = ({ address, cuisines, galleries, generalFormValues }: Props) => {
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


    if (!generalFormValues) {
        notFound()
    }


    return (
        <div className="space-y-6">
            <MultiStepTabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
            <ScrollArea className="px-4 h-[calc(100vh-200px)]">
                <ScrollBar />
                <div className={cn("hidden", activeTab == 0 && "block")}>
                    <RestaurantBasicForm
                        formValues={generalFormValues}
                    />
                </div>
                <div className={cn("hidden", activeTab == 1 && "block")}>
                    <RestaurantCuisineForm
                        restaurantId={generalFormValues.id}
                        formValues={cuisines}
                    />
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

