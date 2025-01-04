import { EditCityWrapper } from "@/components/page-components/cities/edit-city-wrapper"
import { TParams } from "@/lib/types/global.type"



const EditCityPage = async ({ params }: TParams) => {
    const param = await params

    return (
        <EditCityWrapper slug={param.citySlug} />
    )
}

export default EditCityPage