import { GalleryForm } from "@/components/choose-image-card/gallery-form";
import { FormFieldWrapper, FormFooter } from "@/components/form/form-field-wrapper";
import { Form } from "@/components/ui/form";
import { updateRestaurantBrandings } from "@/lib/actions/food/action.restaurant";
import { API_ROUTES } from "@/lib/routes";
import { TDefaultImage } from "@/lib/types/upload.type";
import { restaurantBrandingDefaultValues, restBrandingFormSchema, TRestBrandingForm } from "@/schemas/fooding/restaurant/restaurant-branding.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
    restaurantId: string | number;
    defaultImages?: {
        logo?: TDefaultImage;
        bannerImage?: TDefaultImage;
    }

}

export const RestaurantBrandingForm = ({ restaurantId, defaultImages }: Props) => {
    const formValues = defaultImages && {
        logo: defaultImages.logo?.id,
        bannerImage: defaultImages.bannerImage?.id
    }

    const form = useForm<TRestBrandingForm>({
        resolver: zodResolver(restBrandingFormSchema),
        defaultValues: formValues || restaurantBrandingDefaultValues
    })
    const [isPending, startTransition] = useTransition();

    console.log(defaultImages, "dea")

    const onSubmit = (values: TRestBrandingForm) => {
        startTransition(async () => {
            const response = await updateRestaurantBrandings(values, restaurantId);
            if (response.success == true) {
                toast.success(response.message)
            }
            else {
                toast.error(response.message || "Something went wrong")
            }
        })
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormFieldWrapper
                    description='Upload your logo  here Image size should not be more than  2 MB'
                    label='logo'
                >
                    <GalleryForm
                        defaultImages={defaultImages?.logo?.id ? [defaultImages.logo] : []}
                        allowMultiple={false}
                        fieldId={"logo"}
                        label={"Logo"}
                        fetchEndPoint={API_ROUTES.singleRestImage.endpoint + "/" + restaurantId}
                        uploadEndPoint={API_ROUTES.singleRestImage.endpoint + "/" + restaurantId}
                    />
                </FormFieldWrapper>

                <FormFieldWrapper
                    description='Upload your banner image, size should not be more than  2 MB'
                    label='Banner'
                >
                    <GalleryForm
                        defaultImages={defaultImages?.bannerImage?.id ? [defaultImages.bannerImage] : []}
                        allowMultiple={false}
                        fieldId={"bannerImage"}
                        label={"Banner Image"}
                        fetchEndPoint={API_ROUTES.singleRestImage.endpoint + "/" + restaurantId}
                        uploadEndPoint={API_ROUTES.singleRestImage.endpoint + "/" + restaurantId}
                    />
                </FormFieldWrapper>

                <FormFooter
                    buttonLabel={"Update Images"}
                    pending={isPending}
                />
            </form>
        </Form>
    )
}
