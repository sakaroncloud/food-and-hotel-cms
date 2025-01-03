import { GalleryForm } from '@/components/choose-image-card/property/gallery-form'
import { FormFieldWrapper, FormFooter } from '@/components/form/form-field-wrapper'
import { Form } from '@/components/ui/form'
import { submitPropertyGallery } from '@/lib/actions/lodging/action.property'
import { API_ROUTES } from '@/lib/routes'
import { TDefaultImage } from '@/lib/types/upload.type'
import { propertyGallerySchema, TPropertyGalleryClientForm } from '@/schemas/lodging/property/property.gallery.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

type Props = {
    propertyId: string;
    roomId?: string;
    defaultImages?: TDefaultImage[];
}



export const PropertyGalleryForm = ({ defaultImages, propertyId }: Props) => {

    const formValues = {
        galleryIds: defaultImages ? defaultImages.map((image) => image.id) : []
    }
    const form = useForm<TPropertyGalleryClientForm>({
        resolver: zodResolver(propertyGallerySchema),
        defaultValues: formValues || {}
    })

    const [isPending, startTransition] = useTransition();

    const onSubmit = (values: TPropertyGalleryClientForm) => {
        startTransition(async () => {
            const response = await submitPropertyGallery(values, propertyId);
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
                    description='Upload your property image gallery here Image size should not be more than  2 MB'
                    label='Gallery'
                >
                    <GalleryForm
                        defaultImages={defaultImages || []}
                        allowMultiple={true}
                        fieldId={"galleryIds"}
                        label={"Gallery"}
                        fetchEndPoint={API_ROUTES.propertyImage.endpoint + "/" + propertyId}
                        uploadEndPoint={API_ROUTES.propertyImage.endpoint + "/" + propertyId}
                    />
                </FormFieldWrapper>

                <FormFooter
                    buttonLabel={"Update Gallery"}
                    pending={isPending}
                />
            </form>
        </Form>
    )
}