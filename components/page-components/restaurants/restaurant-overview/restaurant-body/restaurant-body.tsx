import { getData } from "@/app/data";
import { API_ROUTES } from "@/lib/routes";
import { ResponseWithNoMeta, TRestaurant } from "@/lib/types/response.type";
import { RestaurantBodyCard } from "./restaurant-body-card";
import { generateRestaurantCards } from "@/app/(dashboard)/restaurants/utils/utils";


type Props = {
    restaurantSlug: string;
}

export const RestaurantBody = async ({ restaurantSlug }: Props) => {

    const result = await getData<ResponseWithNoMeta<TRestaurant>>({
        endPoint: API_ROUTES.restaurant.endpoint,
        param: restaurantSlug,
        tags: ["restaurant", restaurantSlug]
    });

    const restaurant = result?.data

    if (!restaurant) return null

    const cards = generateRestaurantCards(restaurant)

    return (
        <div className="flex justify-between gap-4 flex-wrap h-fit">
            <div className="grid grid-cols-3 gap-4 p-6  rounded-lg flex-1">
                {Object.keys(cards).map((key) => {
                    return (<RestaurantBodyCard key={key} Icon={cards[key].Icon} value={cards[key].value} label={cards[key].label} iconColor={cards[key].iconColor} link={cards[key].link} />)
                })}
            </div></div>
    )
}

