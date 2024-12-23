"use client"
import { DashboardProvider } from "@/components/providers/dashboard-wrapper";
import { TBreadCrumb } from "@/lib/types/global.type";
export default function DashboardPage() {
  const breadcrumb: TBreadCrumb[] = [
    {
      label: "Dashboard",
      link: "#"
    }
  ]
  return (
    <DashboardProvider breadcrumb={breadcrumb}>
      Dashboard
    </DashboardProvider>
  )
}
