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
        <SidebarProvider  >
            <AppSidebar />
            <SidebarInset>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}

export default DashboardLayout