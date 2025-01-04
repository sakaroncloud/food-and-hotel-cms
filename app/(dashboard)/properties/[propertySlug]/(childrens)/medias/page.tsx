import { TableSearchForm } from '@/components/table/table-search-form'
import { TableWrapperWithFilter } from '@/components/table/table-wrapper-with-filter'
import { DropzoneAndMediaWrapper } from '@/components/uploads/dropzone-media-wrapper/dropzone-media-wrapper'
import { DropzoneTriggerer } from '@/components/uploads/dropzone-triggerer'
import { API_ROUTES } from '@/lib/routes'
import { TParams } from '@/lib/types/global.type'
import { getIDsFromSlug } from '@/lib/utils/utils'

const PropertyMediaPage = async ({ params }: TParams) => {
    const { propertySlug } = await params
    const { propertyId } = getIDsFromSlug({ propertySlug })
    return (
        <TableWrapperWithFilter title="Uploads" headerActions={
            <div className="flex gap-6 items-center">
                <TableSearchForm placeholder="Search Image" />
                <DropzoneTriggerer />
            </div>
        } >
            <DropzoneAndMediaWrapper uploadEndPoint={API_ROUTES.propertyImage.endpoint + "/" + propertyId}
                fetchEndPoint={API_ROUTES.propertyImage.endpoint + "/" + propertyId}
                multiple={true}
            />
        </TableWrapperWithFilter>
    )
}

export default PropertyMediaPage