import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export function RestaurantOverviewTabs() {
  return (
    <Tabs defaultValue="products" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="products">Products</TabsTrigger>
        <TabsTrigger value="menus">Menus</TabsTrigger>
        <TabsTrigger value="cuisines">Cuisines</TabsTrigger>
      </TabsList>
      <TabsContent value="products">
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>
              List of all Products
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            Products
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="menus">
        <Card>
          <CardHeader>
            <CardTitle>Menus</CardTitle>
            <CardDescription>
              List of all menus
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            Cuisines
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="cuisines">
        <Card>
          <CardHeader>
            <CardTitle>Cuisines</CardTitle>
            <CardDescription>
              List of all Cuisines
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            Cuisines
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
