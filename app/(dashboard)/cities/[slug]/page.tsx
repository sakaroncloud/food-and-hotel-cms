import { EditCityWrapper } from "@/components/page-components/cities/edit-city-wrapper"

type Props = {
    params: Promise<{ slug: string }>
}

const EditCityPage = async ({ params }: Props) => {
    const slug = (await params).slug

    return (
        <EditCityWrapper slug={slug} />
    )
}

export default EditCityPage