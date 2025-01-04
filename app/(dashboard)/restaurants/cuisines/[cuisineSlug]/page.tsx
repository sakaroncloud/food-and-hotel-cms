import { EditCuisineWrapper } from "@/components/page-components/cuisines/edit-cuisine-wrapper"
import { TParams } from "@/lib/types/global.type"



const EditCuisinePage = async ({ params }: TParams) => {
    const cuisineSlug = (await params).cuisineSlug

    return (
        <EditCuisineWrapper cuisineSlug={cuisineSlug} />
    )
}

export default EditCuisinePage