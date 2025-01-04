import { CustomFormField } from '@/components/form/custom-form-field';
import { FormFieldWrapper, FormFooter } from '@/components/form/form-field-wrapper';
import { Form } from '@/components/ui/form';
import { useFetch } from '@/hooks/useFetch';
import { submitRestaurantCuisine } from '@/lib/actions/food/action.restaurant';
import { API_ROUTES } from '@/lib/routes';
import { ResponseWithMeta } from '@/lib/types/response.type';
import { Restaurant } from '@/lib/types/restaurant.types';
import { restaurantCuisineDefaultValues, restaurantCuisineFormSchema, TRestCuisineForm } from '@/schemas/fooding/restaurant/restaurant-cuisine.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type Props = {
    restaurantId: string | number;
    formValues?: TRestCuisineForm;
}

export const RestaurantCuisineForm = ({ restaurantId, formValues }: Props) => {
    const { data: cuisines } = useFetch<ResponseWithMeta<Restaurant.Cuisine.TCuisine[]>>({
        endPoint: API_ROUTES.cuisine.endpoint + "?skipPagination=true",
        queryKey: API_ROUTES.cuisine.queryKey,
    });

    const form = useForm<TRestCuisineForm>({
        resolver: zodResolver(restaurantCuisineFormSchema),
        defaultValues: formValues || restaurantCuisineDefaultValues
    })

    const [isPending, startTransition] = useTransition();


    const onSubmit = (values: TRestCuisineForm) => {
        console.log(values)
        startTransition(async () => {
            const response = await submitRestaurantCuisine(values, restaurantId);
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <FormFieldWrapper description="Choose Restaurant Cuisines" label="Cuisines" className="flex flex-col gap-6">
                    <CustomFormField
                        elementName="multiselect"
                        fieldId="cuisines"
                        label="Cuisines"
                        placeholder="Describe a little about your cuisine"
                        className="w-full"
                        isMulti={true}
                        selectOptions={
                            cuisines?.data?.map((cuisine) => ({ value: cuisine.slug, label: cuisine.name })) || []
                        }
                        defaultValue={
                            formValues?.cuisines || restaurantCuisineDefaultValues.cuisines
                        }
                    />
                </FormFieldWrapper>

                <FormFooter
                    buttonLabel={"Update"}
                    pending={isPending}

                />
            </form>
        </Form>
    )
}
