import { EditCuisineWrapper } from "@/components/page-components/cuisines/edit-cuisine-wrapper"

type Props = {
    params: Promise<{ slug: string }>
}

const EditCuisinePage = async ({ params }: Props) => {
    const slug = (await params).slug

    return (
        <EditCuisineWrapper slug={slug} />
    )
}

export default EditCuisinePage