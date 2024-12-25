import { DashboardProvider } from "@/components/providers/dashboard-wrapper";
import { getData } from "../data";
import { API_ROUTES } from "@/lib/routes";
import { ResponseWithMeta, } from "@/lib/types/response.type";
import { Restaurant } from "@/lib/types/restaurant.types";
export default async function DashboardPage() {


  const data = await getData<ResponseWithMeta<Restaurant.TRestaurant[]>>({
    endPoint: API_ROUTES.restaurant.endpoint,
    tags: ["restaurant"]
  })

  return (
    <DashboardProvider>
      Dashboard
    </DashboardProvider>
  )
}
