import { DashboardProvider } from "@/components/providers/dashboard-wrapper"

type Props = {
    children: React.ReactNode,
}

const SingleRestaurantLayout = ({ children }: Props) => {
    return (
        <DashboardProvider >

            {children}
        </DashboardProvider>
    )
}

export default SingleRestaurantLayout