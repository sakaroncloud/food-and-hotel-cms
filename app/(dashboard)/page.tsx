import { DashboardProvider } from "@/components/providers/dashboard-wrapper";
import { TBreadCrumb } from "@/lib/types/global.type";
import { getData } from "../data";
import { API_ROUTES } from "@/lib/routes";
import { ResponseWithMeta, TRestaurant } from "@/lib/types/response.type";
export default async function DashboardPage() {


  const data = await getData<ResponseWithMeta<TRestaurant[]>>({
    endPoint: API_ROUTES.restaurant.endpoint,
    tags: ["restaurant"]
  })

  return (
    <DashboardProvider>
      Dashboard
    </DashboardProvider>
  )
}
