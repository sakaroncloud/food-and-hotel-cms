import { DashboardProvider } from "@/components/providers/dashboard-wrapper";
import { Gallery } from "@/components/uploads/gallery";
import { UploadHeaderActionWrapper } from "@/components/uploads/upload-header-action";
import { TBreadCrumb } from "@/lib/types/global.type";
const breadcrumb: TBreadCrumb[] = [
    {
        label: "Dashboard",
        link: "/"
    }, {
        label: "Cuisines"
    }
]
const FoodMediaPage = () => {
    return (
        <DashboardProvider breadcrumb={breadcrumb}>
            <UploadHeaderActionWrapper />
            <Gallery />

        </DashboardProvider>
    );
};

export default FoodMediaPage;