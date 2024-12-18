import { DashboardProvider } from "@/components/providers/dashboard-wrapper"
import { TBreadCrumb } from "@/lib/types/global.type"

const RestaurantsPage = () => {

  const breadcrumb: TBreadCrumb[] = [
    {
      label: "Dashboard",
      link: "/"
    }, {
      label: "Restaurants"
    }
  ]
  return (
    <DashboardProvider breadcrumb={breadcrumb}>
      <div>RestaurantsPage</div>
    </DashboardProvider>
  )
}

export default RestaurantsPage