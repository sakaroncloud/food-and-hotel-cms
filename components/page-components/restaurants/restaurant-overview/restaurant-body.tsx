"use client"
import { MenuFormModal } from "@/app/(dashboard)/restaurants/[restaurantSlug]/menus/_components/menu-form-modal";
import { ProductFormModal } from "@/app/(dashboard)/restaurants/[restaurantSlug]/products/_components/product-form-modal";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";
import { API_ROUTES } from "@/lib/routes";
import { ResponseWithNoMeta, TRestaurant } from "@/lib/types/response.type";
import { cn, formatDate } from "@/lib/utils";
import { Calendar, CircleDollarSign, Eye, HandPlatter, LucideIcon, PlusIcon, Utensils } from "lucide-react";
import { useRouter } from "next/navigation";
import { ClassNameValue } from "tailwind-merge";

type Props = {
    restaurantSlug: string;
}

export const RestaurantBody = ({ restaurantSlug }: Props) => {
    const router = useRouter()

    const { data: result } = useFetch<ResponseWithNoMeta<TRestaurant>>({
        endPoint: API_ROUTES.restaurant.endpoint,
        param: restaurantSlug,
        queryKey: API_ROUTES.restaurant.queryKey,
    });

    const restaurant = result?.data

    if (!restaurant) return null

    return (
        <div className="flex justify-between gap-4 flex-wrap">
            <div className="grid grid-cols-3 gap-4 p-6  rounded-lg flex-1">
                {restaurant?.createdAt && <CardItem value={formatDate(restaurant?.createdAt)} label="Registered Since" Icon={Calendar} iconColor="text-blue-500" />}
                <CardItem value={restaurant.totalProducts || 0} label="Total Products" Icon={HandPlatter} iconColor="text-orange-500"
                    modalButton={<div className="flex gap-2 items-center">
                        <Button onClick={() => router.push(`/restaurants/${restaurantSlug}/products`)} size={"icon"} variant={"ghost"} className="bg-emerald-500/70 hover:bg-primary p-1 rounded-full "><Eye className='text-white size-5' /></Button>
                        <ProductFormModal isRestaurantVeg={restaurant.isPureVeg} restaurantId={restaurant.id} restaurantSlug={restaurantSlug} label="Add New Product" formDescription="Add your new product here" >
                            <Button size={"icon"} variant={"ghost"} className="bg-primary/80 hover:bg-primary p-1 rounded-full "><PlusIcon className='text-white size-5' /></Button>
                        </ProductFormModal>
                    </div>}
                />
                <CardItem value={restaurant.totalMenus || 0} label="Total Menus" Icon={Utensils} iconColor="text-green-500"
                    modalButton={<div className="flex gap-2 items-center">
                        <Button onClick={() => router.push(`/restaurants/${restaurantSlug}/menus`)} size={"icon"} variant={"ghost"} className="bg-emerald-500/70 hover:bg-primary p-1 rounded-full ">
                            <Eye className='text-white size-5' />
                        </Button>
                        <MenuFormModal isPureVeg={restaurant.isPureVeg} restaurantId={restaurant.id} restaurantSlug={restaurantSlug} label="Add New Menu" formDescription="Add your new menu here" />
                    </div>}
                />
                <CardItem value={"% " + restaurant.commissionPercentage} label="Commission Percentage" Icon={CircleDollarSign} iconColor="text-purple-500" />
            </div>
        </div>
    )
}

type CardItemProps = {
    value: string | number;
    label: string;
    Icon: LucideIcon;
    iconColor: ClassNameValue;
    modalButton?: React.ReactNode;
}

const CardItem = ({ value, label, Icon, iconColor, modalButton }: CardItemProps) => {
    return (
        <div className="bg-gray-100 rounded-xl p-6 border border-gray-300 shadow-sm">
            <span className="text-lg text-gray-700">{value}</span>
            <div className="flex items-center gap-2 justify-between">
                <div className="font-medium text-lg ">
                    {label}
                </div>
                <div>
                    <Icon className={cn("size-8", iconColor)} />
                </div>

            </div>
            {modalButton}
        </div>
    )
}