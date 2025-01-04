"use client"

import { useState } from "react"
import { PropertyBasicForm } from "./form/property-basic-form"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { TPropertyBasicForm } from "@/schemas/lodging/property/property-basic.schema"
import { cn } from "@/lib/utils/utils"
import { PropertyAmenityForm } from "./form/property-amenity-form"
import { TPropertyAmenitiesClientForm } from "@/schemas/lodging/property/property-amenities.schema"
import { PropertyRuleForm } from "./form/property-rule-form"
import { TPropertyRulesClientForm } from "@/schemas/lodging/property/property-rules.schema"
import { PropertyLocationsForm } from "./form/property-locations-form"
import { TPropertyLocationsForm } from "@/schemas/lodging/property/property-locations.schema"
import { PropertyGalleryForm } from "./form/property-gallery-form"
import { PropertyAddressForm } from "./form/property-address-form"
import { TAddressForm } from "@/schemas/schema.address"
import { TAsyncGallery } from "@/lib/types/upload.type"
import { MultiStepTabs } from "@/components/form/multi-step-tabs"

type Props = {
    generalFormValues: TPropertyBasicForm & { id: string, slug: string };
    amenities?: TPropertyAmenitiesClientForm;
    rules?: TPropertyRulesClientForm;
    nearestLocations?: TPropertyLocationsForm;
    galleries?: TAsyncGallery;
    address?: TAddressForm;
}


export const EditPropertyWrapper = ({ address, amenities, galleries, generalFormValues, nearestLocations, rules }: Props) => {
    const [activeTab, setActiveTab] = useState(0)

    const tabs = [
        {
            label: "General Info",
            value: "general",
            published: true
        },
        {
            label: "Amenities",
            value: "amenities",
            published: amenities !== undefined && amenities !== null
        },
        {
            label: "Nearest Locations",
            value: "nearestLocations",
            published: nearestLocations !== undefined && nearestLocations !== null
        },
        {
            label: "Rules",
            value: "rules",
            published: rules !== undefined && rules !== null
        },

        {
            label: "Gallery",
            value: "gallery",
            published: galleries !== undefined && galleries !== null && galleries?.length > 0
        },

        {
            label: "Address",
            value: "address",
            published: address !== undefined && address !== null
        }
    ]



    return (
        <div className="space-y-6">
            <MultiStepTabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
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
                    <PropertyLocationsForm
                        id={generalFormValues.id}
                        formValues={nearestLocations}
                    />
                </div>
                <div className={cn("hidden", activeTab == 3 && "block")}>
                    <PropertyRuleForm
                        id={generalFormValues?.id}
                        formValues={rules}
                    />
                </div>
                <div className={cn("hidden", activeTab == 4 && "block")}>
                    <PropertyGalleryForm propertyId={generalFormValues?.id}
                        defaultImages={galleries}
                    />
                </div>

                <div className={cn("hidden", activeTab == 5 && "block")}>
                    <PropertyAddressForm
                        propertyId={generalFormValues?.id}
                        formValues={address}
                    />
                </div>
            </ScrollArea>
        </div>

    )
}

