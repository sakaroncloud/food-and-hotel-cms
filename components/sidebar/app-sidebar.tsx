"use client"

import * as React from "react"
import {
    Bed,
    Bike,
    GalleryThumbnails,
    Hotel,
    Images,
    LayoutDashboard,
    Rocket,
    Settings,
    ShieldCheck,
    ShoppingBag,
    Store,
    Users,

} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { NavServices } from "./nav-services"
import { NavUser } from "./nav-user"
import { PiBowlFood } from "react-icons/pi";
import Logo from "@/public/white-logo-icon.png"
import { SidebarLogoArea } from "./sidebar-logo-area"
import { ScrollArea } from "../ui/scroll-area"



// This is sample data.
const data = {
    user: {
        name: "Juba Hospitality",
        email: "contact@jubahospitality.com",
        avatar: "/avatars/shadcn.jpg",
    },
    services: [
        {
            name: "Food Dashboard",
            logo: Logo,
            plan: "Food Delivery",
            icon: Store
        },
        {
            name: "Lodging Dashboard",
            logo: Logo,
            plan: "Room Booking",
            icon: Hotel
        }
    ],


    overview: [
        {
            name: "Dashboard",
            url: "/",
            icon: LayoutDashboard,
        }

    ],

    fooding: [
        {
            name: "Restaurants",
            url: "/restaurants",
            icon: Store,
            items: [
                {
                    name: "All restaurants",
                    url: "/restaurants",
                },
                {
                    name: "Add New",
                    url: "/restaurants/add",
                },
            ]
        },
        {
            name: "Orders",
            url: "/orders",
            icon: ShoppingBag,
        },
        {
            name: "Cuisines",
            url: "cuisines",
            icon: PiBowlFood,
            items: [
                {
                    name: "All cuisines",
                    url: "/cuisines",
                },
                {
                    name: "Add New",
                    url: "/cuisines/add",
                },
            ]
        },
        {
            name: "Riders",
            url: "/riders",
            icon: Bike,
            items: [
                {
                    name: "All riders",
                    url: "/riders",
                },
                {
                    name: "Add New",
                    url: "/riders/add",
                },
            ]
        },
        {
            name: "Food Media",
            url: "/food-media",
            icon: Images,
        },
    ],

    lodging: [
        {
            name: "Properties",
            url: "/properties",
            icon: Hotel,
        },

        {
            name: "Bookings",
            url: "/bookings",
            icon: Bed,
        }
    ],

    settings: [
        {
            name: "General Settings",
            url: "/settings",
            icon: Settings,
        },

        {
            name: "SEO",
            url: "/settings",
            icon: Rocket,
        }
    ],

    users: [
        {
            name: "Admin",
            url: "/users",
            icon: ShieldCheck,
        },

        {
            name: "Customers",
            url: "/users",
            icon: Users,
        }
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>

                <SidebarLogoArea />
            </SidebarHeader>
            <SidebarContent>
                <ScrollArea>
                    <NavServices title={"Overview"} services={data.overview} />
                    <NavServices title={"Fooding"} services={data.fooding} />

                    <NavServices title={"Lodging"} services={data.lodging} />
                    <NavServices title={"Users Management"} services={data.users} />

                    <NavServices title={"Settings"} services={data.settings} />
                </ScrollArea>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
