import { OrderFilterSkeleton, OrderFilterHeader } from '@/components/page-components/restaurants/pages/orders/order-filter-header'
import { OrderTable } from '@/components/page-components/restaurants/pages/orders/order-table'
import { OrdersHeaderActions } from '@/components/page-components/restaurants/pages/orders/orders-header-action'
import { DashboardProvider } from '@/components/providers/dashboard-wrapper'
import { CustomTableWrapper } from '@/components/table/rental/custom-table-wrapper'
import { TParams } from '@/lib/types/global.type'
import { Suspense } from 'react'

const OrdersPage = async ({ searchParams }: TParams) => {
    return (
        <DashboardProvider>
            <CustomTableWrapper
                title='All Orders'
                filterHeader={
                    <Suspense fallback={<OrderFilterSkeleton />}>
                        <OrderFilterHeader />
                    </Suspense>
                }
            >

                {/* Order Filter Area */}
                <OrderTable />
            </CustomTableWrapper>
        </DashboardProvider>
    )
}

export default OrdersPage