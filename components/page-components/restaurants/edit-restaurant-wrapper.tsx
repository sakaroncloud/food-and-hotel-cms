"use client"

import { useState } from "react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils/utils"

import { TAddressForm } from "@/schemas/schema.address"
import { TAsyncGallery, TDefaultImage } from "@/lib/types/upload.type"
import { MultiStepTabs } from "@/components/form/multi-step-tabs"
import { TRestBasicForm } from "@/schemas/fooding/restaurant/restaurant-basic.schema"
import { notFound } from "next/navigation"
import { RestaurantBasicForm } from "./forms/restaurant-basic-form"
import { RestaurantCuisineForm } from "./forms/restaurant-cuisine-form"
import { TRestCuisineForm } from "@/schemas/fooding/restaurant/restaurant-cuisine.schema"
import { RestaurantBrandingForm } from "./forms/restaurant-branding-form"
import { RestaurantGalleryForm } from "./forms/restaurant-gallery-form"
import { RestaurantAddressForm } from "./forms/restaurant-address-form"

type Props = {
    generalFormValues: TRestBasicForm & { id: number };
    galleries?: TAsyncGallery;
    address?: TAddressForm;
    cuisines?: TRestCuisineForm;
    brandings?: {
        logo?: TDefaultImage;
        bannerImage?: TDefaultImage;
    };
}


export const EditRestaurantWrapper = ({ address, brandings, cuisines, galleries, generalFormValues }: Props) => {
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
            published: cuisines?.cuisines && cuisines?.cuisines?.length > 0 || false
        },
        {
            label: "Branding",
            value: "branding",
            published: (brandings && (brandings?.bannerImage !== null && brandings?.logo !== null)) || false,
        },

        {
            label: "Gallery",
            value: "gallery",
            published: galleries !== undefined && galleries !== null && galleries?.length > 0
        },


        {
            label: "Offers",
            value: "offers",
            published: false,
        },

        {
            label: "Address",
            value: "address",
            published: address !== undefined && address !== null
        }
    ]


    if (!generalFormValues) {
        notFound()
    }


    return (
        <div className="space-y-5">
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
                    <RestaurantBrandingForm
                        restaurantId={generalFormValues.id}
                        defaultImages={brandings}
                    />
                </div>
                <div className={cn("hidden", activeTab == 3 && "block")}>
                    <RestaurantGalleryForm
                        restaurantId={generalFormValues.id}
                        defaultImages={galleries}
                    />
                </div>
                <div className={cn("hidden", activeTab == 4 && "block")}>

                </div>

                <div className={cn("hidden", activeTab == 5 && "block")}>
                    <RestaurantAddressForm
                        restaurantId={generalFormValues?.id}
                        formValues={address}
                    />
                </div>
            </ScrollArea>
        </div>

    )
}

