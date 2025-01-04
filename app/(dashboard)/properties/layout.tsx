import { DashboardProvider } from '@/components/providers/dashboard-wrapper'

const PropertyLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <DashboardProvider>
            {children}
        </DashboardProvider>
    )
}

export default PropertyLayout