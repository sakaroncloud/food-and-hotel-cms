import { DashboardProvider } from "@/components/providers/dashboard-wrapper";
import { TableSearchForm } from "@/components/table/table-search-form";
import { TableWrapperWithFilter } from "@/components/table/table-wrapper-with-filter";
import { DropzoneAndMediaWrapper } from "@/components/uploads/dropzone-media-wrapper/dropzone-media-wrapper";
import { DropzoneTriggerer } from "@/components/uploads/dropzone-triggerer";
import { API_ROUTES } from "@/lib/routes";

const FoodMediaPage = () => {
    return (

        <DashboardProvider >
            <TableWrapperWithFilter title="All Images from Restaurants" headerActions={
                <div className="flex gap-6 items-center">
                    <TableSearchForm placeholder="Search Image" />
                    <DropzoneTriggerer />
                </div>
            } >
                <DropzoneAndMediaWrapper uploadEndPoint={API_ROUTES.allRestImage.endpoint}
                    fetchEndPoint={API_ROUTES.allRestImage.endpoint}
                />
            </TableWrapperWithFilter>
        </DashboardProvider>
    );
};

export default FoodMediaPage;