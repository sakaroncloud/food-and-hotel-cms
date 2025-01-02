"use client"

import { useState } from "react"
import { PropertyNavTabs } from "../../property-wrapper/property-nav-tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils/utils"
import { TRoomBasicForm } from "@/schemas/lodging/room/room-basic.schema"
import { RoomBasicForm } from "./forms/room-form"
import { TRoomAmenitiesClientForm } from "@/schemas/lodging/room/room-amenities.schema"
import { RoomAmenityForm } from "./forms/room-amenity-form"
import { RoomRuleForm } from "./forms/room-rule-form"
import { TRoomRulesClientForm } from "@/schemas/lodging/room/room-rules.schema"
type Props = {
    generalFormValues: TRoomBasicForm;
    roomId: string;
    roomAmenities?: TRoomAmenitiesClientForm;
    rules?: TRoomRulesClientForm;
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
            published: true
        },


    ]

    return (
        <div className="space-y-6">
            <PropertyNavTabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
            <ScrollArea className="px-4 h-[calc(100vh-200px)]">
                <ScrollBar />
                <div className={cn("hidden", activeTab == 0 && "block")}>
                    <RoomBasicForm
                        propertyId={props.generalFormValues.propertyID}
                        roomId={props.roomId}
                        formValues={props.generalFormValues}
                    />
                </div>
                <div className={cn("hidden", activeTab == 1 && "block")}>
                    <RoomAmenityForm
                        formValues={props.roomAmenities}
                        roomID={props.roomId} />
                </div>
                <div className={cn("hidden", activeTab == 2 && "block")}>
                    <RoomRuleForm roomID={props.roomId}
                        propertyID={props.generalFormValues.propertyID}
                        formValues={props.rules}
                    />
                </div>
                <div className={cn("hidden", activeTab == 3 && "block")}>
                    Gallery
                </div>
            </ScrollArea>
        </div>

    )
}

