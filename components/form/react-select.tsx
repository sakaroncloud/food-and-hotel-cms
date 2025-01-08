"use client";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import Select, { GroupBase, Props as SelectProps } from "react-select";

type PropsType<
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option>
> = {
    fieldId: string;
    placeholder: string;
    required?: boolean;
} & SelectProps<Option, IsMulti, Group>;

export const ReactMultiSelect = <
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
>(
    props: PropsType<Option, IsMulti, Group>
) => {
    const { fieldId, placeholder, required, ...selectProps } = props;
    const form = useFormContext();

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => setIsMounted(true), []);

    if (!isMounted) return null;

    return (
        <FormField
            control={form.control}
            name={fieldId}
            render={({ field }) => (
                <FormItem className="w-full">

                    <FormControl>
                        <Select
                            placeholder={placeholder}
                            className="w-full"
                            onChange={field.onChange}
                            id={fieldId}
                            {...selectProps}
                            theme={(theme) => ({ ...theme, borderRadius: 4 })}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};