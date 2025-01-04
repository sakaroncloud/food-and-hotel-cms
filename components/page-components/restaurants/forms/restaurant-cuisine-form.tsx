import { CustomFormField } from '@/components/form/custom-form-field';
import { FormFieldWrapper, FormFooter } from '@/components/form/form-field-wrapper';
import { Form } from '@/components/ui/form';
import { useFetch } from '@/hooks/useFetch';
import { API_ROUTES } from '@/lib/routes';
import { ResponseWithMeta } from '@/lib/types/response.type';
import { Restaurant } from '@/lib/types/restaurant.types';
import { restaurantCuisineDefaultValues, restaurantCuisineFormSchema, TRestaurantCuisineForm } from '@/schemas/fooding/restaurant/restaurant-cuisine.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition } from 'react';
import { useForm } from 'react-hook-form';

export const RestaurantCuisineForm = () => {
    const { data: cuisines } = useFetch<ResponseWithMeta<Restaurant.Cuisine.TCuisine[]>>({
        endPoint: API_ROUTES.cuisine.endpoint + "?skipPagination=true",
        queryKey: API_ROUTES.cuisine.queryKey,
    });

    const form = useForm<TRestaurantCuisineForm>({
        resolver: zodResolver(restaurantCuisineFormSchema),
        defaultValues: restaurantCuisineDefaultValues
    })

    const onSubmit = (values: TRestaurantCuisineForm) => {
        startTransition(async () => {

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
                            cuisines?.data?.map((cuisine) => ({ value: cuisine.id, label: cuisine.name })) || []
                        }
                        defaultValue={
                            restaurantCuisineDefaultValues.cuisines
                        }
                    />
                </FormFieldWrapper>

                <FormFooter
                    buttonLabel={"Update"}
                    pending={false}

                />
            </form>
        </Form>
    )
}
