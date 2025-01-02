import { getData } from "@/app/data";
import { API_ROUTES } from "@/lib/routes";
import { Property } from "@/lib/types/property.types";
import { ResponseWithNoMeta } from "@/lib/types/response.type";
import { RestaurantBodyCard } from "../../restaurants/restaurant-overview/restaurant-body/restaurant-body-card";
import { Calendar, CircleDollarSign, DoorClosed } from "lucide-react";
import { formatDate } from "@/lib/utils/utils";

type Props = {
    propertyId: string;
}
export const SinglePropertyBody = async ({ propertyId }: Props) => {
    const result = await getData<ResponseWithNoMeta<Property.TProperty>>({
        endPoint: API_ROUTES.property.endpoint,
        param: propertyId,
        tags: ["property", propertyId]
    });

    const property = result?.data

    if (!property) return null

    return (
        <div className="flex justify-between gap-4 flex-wrap h-fit">
            <div className="grid grid-cols-3 gap-4 p-6  rounded-lg flex-1">
                <RestaurantBodyCard
                    Icon={Calendar}
                    value={formatDate(formatDate(property.createdAt))}
                    label={"Registered Since"}
                    iconColor={"text-blue-500"}
                />

                <RestaurantBodyCard
                    Icon={DoorClosed}
                    value={property.totalRooms}
                    label={"Total Rooms"}
                    iconColor={"text-blue-500"}
                    link={`/properties/${property.slug}/rooms`}
                />

                <RestaurantBodyCard
                    Icon={CircleDollarSign}
                    value={property.commissionPercentage}
                    label={"Commission Percentage"}
                    iconColor={"text-blue-500"}
                />
            </div>
        </div>
    )
}
