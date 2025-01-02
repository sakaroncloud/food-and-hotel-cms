import { DashboardProvider } from "@/components/providers/dashboard-wrapper";
import { TableSearchForm } from "@/components/table/table-search-form";
import { TableWrapperWithFilter } from "@/components/table/table-wrapper-with-filter";
import { Gallery } from "@/components/uploads/gallery";
import { UploadDropDownButton } from "@/components/uploads/upload-header-action";

const PropertyMediaPage = () => {
    return (
        <DashboardProvider >
            <TableWrapperWithFilter title="Uploads" headerActions={
                <div className="flex gap-6 items-center">
                    <TableSearchForm placeholder="Search Image" />
                    <UploadDropDownButton />
                </div>
            } >
                <Gallery />
            </TableWrapperWithFilter>
        </DashboardProvider>
    );
};

export default PropertyMediaPage;