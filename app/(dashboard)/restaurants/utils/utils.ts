import { CardItemProps } from "@/lib/types/global.type"
import { Restaurant } from "@/lib/types/restaurant.types"
import { formatDate } from "@/lib/utils/utils"
import { Calendar, CircleDollarSign, HandPlatter, Utensils } from "lucide-react"

export const generateRestaurantCards = (restaurant: Restaurant.TRestaurant) => {


    const cards: Record<string, CardItemProps> = {
        registeredDate: {
            value: formatDate(restaurant.createdAt),
            label: "Registered Since",
            Icon: Calendar,
            iconColor: "text-blue-500",
        },
        totalProducts: {
            value: restaurant.totalProducts || 0,
            label: "Total Products",
            Icon: HandPlatter,
            link: `/restaurants/${restaurant.slug}/products`,
            iconColor: "text-orange-500",
        },
        totalMenus: {
            value: restaurant.totalMenus || 0,
            label: "Total Menus",
            Icon: Utensils,
            link: `/restaurants/${restaurant.slug}/menus`,
            iconColor: "text-green-500",
        },
        totalCuisines: {
            value: restaurant.totalCuisines || 0,
            label: "Total Cuisines",
            Icon: Utensils,
            iconColor: "text-green-500",
        },
        commissionPercentage: {
            value: restaurant.commissionPercentage,
            label: "Commission Percentage (%)",
            Icon: CircleDollarSign,
            iconColor: "text-purple-500",
        }
    }

    return cards
}