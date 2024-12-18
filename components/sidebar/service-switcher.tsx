"use client"

import * as React from "react"
import { ChevronsUpDown, LucideIcon } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"
import Image, { StaticImageData } from "next/image"
import ColorFavicon from "@/public/favicon.png"

export function ServiceSwitcher({
    services,
}: {
    services: {
        name: string
        logo: StaticImageData
        icon: LucideIcon
        plan: string
    }[]
}) {
    const { isMobile } = useSidebar()
    const [activeService, setActiveService] = React.useState(() => {
        const activeDashboard = localStorage.getItem("activeDashboard")
        if (activeDashboard == "1") {
            return services[1]
        }
        return services[0]
    })

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground">
                                <Image className="size-4" src={activeService.logo}
                                    height={30}
                                    width={30}
                                    alt="logo"
                                />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    {activeService.name}
                                </span>
                                <span className="truncate text-xs">{activeService.plan}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        align="start"
                        side={isMobile ? "bottom" : "right"}
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="text-xs text-muted-foreground">
                            Services
                        </DropdownMenuLabel>
                        {services.map((service, index) => (
                            <DropdownMenuItem
                                key={service.name}
                                onClick={() => {
                                    setActiveService(service)
                                    localStorage.setItem("activeDashboard", String(index))
                                }}
                                className="gap-2 p-2"
                            >
                                <div className="flex size-6 items-center justify-center rounded-sm border">
                                    <service.icon />
                                </div>
                                {service.name}
                                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        ))}

                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
