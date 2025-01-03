import { TableSearchForm } from '@/components/table/table-search-form'
import { TableWrapperWithFilter } from '@/components/table/table-wrapper-with-filter'
import { DropzoneAndMediaWrapper } from '@/components/uploads/dropzone-media-wrapper/dropzone-media-wrapper'
import { DropzoneTriggerer } from '@/components/uploads/dropzone-triggerer'
import { API_ROUTES } from '@/lib/routes'
import { TParams } from '@/lib/types/global.type'
import { getPropertyIDFromPropertySlug } from '@/lib/utils/property.utils'

const PropertyMediaPage = async ({ params }: TParams) => {
    const param = await params
    const propertyID = getPropertyIDFromPropertySlug(param.propertySlug)
    return (
        <TableWrapperWithFilter title="Uploads" headerActions={
            <div className="flex gap-6 items-center">
                <TableSearchForm placeholder="Search Image" />
                <DropzoneTriggerer />
            </div>
        } >
            <DropzoneAndMediaWrapper uploadEndPoint={API_ROUTES.propertyImage.endpoint + "/" + propertyID}
                fetchEndPoint={API_ROUTES.propertyImage.endpoint + "/" + propertyID}
                multiple={true}
            />
        </TableWrapperWithFilter>
    )
}

export default PropertyMediaPage