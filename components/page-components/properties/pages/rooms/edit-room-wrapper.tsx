"use client"

import { useState } from "react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils/utils"
import { TRoomBasicForm } from "@/schemas/lodging/room/room-basic.schema"
import { RoomBasicForm } from "./forms/room-form"
import { TRoomAmenitiesClientForm } from "@/schemas/lodging/room/room-amenities.schema"
import { RoomAmenityForm } from "./forms/room-amenity-form"
import { RoomRuleForm } from "./forms/room-rule-form"
import { TRoomRulesClientForm } from "@/schemas/lodging/room/room-rules.schema"
import { RoomGalleryForm } from "./forms/room-gallery-form"
import { TAsyncGallery } from "@/lib/types/upload.type"
import { MultiStepTabs } from "@/components/form/multi-step-tabs"
type Props = {
    generalFormValues: TRoomBasicForm;
    roomId: string;
    roomAmenities?: TRoomAmenitiesClientForm;
    rules?: TRoomRulesClientForm;
    galleries?: TAsyncGallery;
}

export const EditRoomWrapper = ({ ...props }: Props) => {
    const [activeTab, setActiveTab] = useState(0)

    const tabs = [
        {
            label: "General Info",
            value: "general",
            published: props.generalFormValues !== undefined
        },
        {
            label: "Amenities",
            value: "amenities",
            published: props.roomAmenities !== undefined
        },

        {
            label: "Rules",
            value: "rules",
            published: props.rules !== undefined
        },

        {
            label: "Gallery",
            value: "gallery",
            published: props.galleries !== undefined && props.galleries !== null && props.galleries?.length > 0
        },


    ]

    return (
        <div className="space-y-5">
            <MultiStepTabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
            <ScrollArea className="px-4 h-[calc(100vh-200px)]">
                <ScrollBar />
                <div className={cn("hidden", activeTab == 0 && "block")}>
                    <RoomBasicForm
                        propertyId={props.generalFormValues.propertyId}
                        roomId={props.roomId}
                        formValues={props.generalFormValues}
                    />
                </div>
                <div className={cn("hidden", activeTab == 1 && "block")}>
                    <RoomAmenityForm
                        propertyId={props.generalFormValues.propertyId}
                        formValues={props.roomAmenities}
                        roomId={props.roomId} />
                </div>
                <div className={cn("hidden", activeTab == 2 && "block")}>
                    <RoomRuleForm roomId={props.roomId}
                        propertyId={props.generalFormValues.propertyId}
                        formValues={props.rules}
                    />
                </div>
                <div className={cn("hidden", activeTab == 3 && "block")}>
                    <RoomGalleryForm
                        propertyId={props.generalFormValues.propertyId}
                        roomId={props.roomId}
                        defaultImages={props.galleries}
                    />
                </div>
            </ScrollArea>
        </div>

    )
}

