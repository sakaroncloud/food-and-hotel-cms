import { DashboardProvider } from "@/components/providers/dashboard-wrapper";
import { TableSearchForm } from "@/components/table/table-search-form";
import { TableWrapperWithFilter } from "@/components/table/table-wrapper-with-filter";
import { DropzoneAndMediaWrapper } from "@/components/uploads/dropzone-media-wrapper/dropzone-media-wrapper";
import { DropzoneTriggerer } from "@/components/uploads/dropzone-triggerer";
import { GalleryGrid } from "@/components/uploads/gallery-grid";
import { API_ROUTES } from "@/lib/routes";

const FoodMediaPage = () => {
    return (

        <DashboardProvider >
            <TableWrapperWithFilter title="Uploads" headerActions={
                <div className="flex gap-6 items-center">
                    <TableSearchForm placeholder="Search Image" />
                    <DropzoneTriggerer />
                </div>
            } >
                <DropzoneAndMediaWrapper uploadEndPoint={API_ROUTES.restImage.endpoint}
                    fetchEndPoint=""
                    
                />
            </TableWrapperWithFilter>
        </DashboardProvider>
    );
};

export default FoodMediaPage;