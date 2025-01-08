"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useCustomSearchParams } from "@/hooks/useCustomSearchParams";
import { ReactMultiSelect } from "@/components/form/react-select";

type Props = {
    options: {
        label: string;
        value: string;
    }[];
    placeholder: string;
    fieldId: string;
};

export const OrderFilter = ({ options, placeholder, fieldId }: Props) => {
    const form = useForm({});
    const { createQueryString, searchParams, deleteQueryString } =
        useCustomSearchParams();

    return (
        <Form {...form}>
            <form className=" w-full">
                <ReactMultiSelect
                    isClearable={true}
                    options={options}
                    fieldId={fieldId}
                    placeholder={placeholder}
                    className="w-full text-sm h-11"
                    defaultValue={
                        searchParams.get(fieldId)
                            ? {
                                value: searchParams.get(fieldId),
                                label: options.find((option) => option.value === searchParams.get(fieldId))?.label,
                            }
                            : null
                    }
                    onChange={(option) => {
                        if (option && option?.value) {
                            createQueryString(fieldId, option.value);
                        } else {
                            deleteQueryString(fieldId);
                        }
                    }}
                />
            </form>
        </Form>
    );
};