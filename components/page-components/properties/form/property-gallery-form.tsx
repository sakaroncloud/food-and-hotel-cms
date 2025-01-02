import { GalleryForm } from '@/components/choose-image-card/property/gallery-form'
import { FormFieldWrapper } from '@/components/form/form-field-wrapper'
import { Form } from '@/components/ui/form'
import { API_ROUTES } from '@/lib/routes'
import { TDefaultImage } from '@/lib/types/upload.type'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Props = {
    propertyId: string;
    roomId?: string;
    defaultImages?: TDefaultImage[];
}

const schema = z.object({
    galleryIds: z.array(z.string().uuid()).optional(),
})

export const PropertyGalleryForm = ({ defaultImages, propertyId, roomId }: Props) => {
    const formValues = {
        galleryIds: defaultImages ? defaultImages.map((image) => image.id) : []
    }
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: formValues || {}
    })

    return (
        <Form {...form}>
            <form>
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
            </form>
        </Form>
    )
}
