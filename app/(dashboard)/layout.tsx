import { GalleryProvider } from "@/components/providers/gallery-context"
import { AppSidebar } from "@/components/sidebar/app-sidebar"

import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
type Props = {
    children: React.ReactNode
}
const DashboardLayout = ({ children }: Props) => {
    return (
        <GalleryProvider>
            <SidebarProvider >
                <AppSidebar />
                <SidebarInset className="bg-gray-100">
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </GalleryProvider>
    )
}

export default DashboardLayout