import { EditCuisineWrapper } from "@/components/page-components/cuisines/edit-cuisine-wrapper"
import { DashboardProvider } from "@/components/providers/dashboard-wrapper"
import { TParams } from "@/lib/types/global.type"



const EditCuisinePage = async ({ params }: TParams) => {
    const cuisineSlug = (await params).cuisineSlug

    return (
        <DashboardProvider>
            <EditCuisineWrapper cuisineSlug={cuisineSlug} />
        </DashboardProvider>
    )
}

export default EditCuisinePage