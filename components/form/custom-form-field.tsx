"use client"

import { ControllerRenderProps, FieldValues, useFormContext } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select as ShadcnSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { PasswordInput } from "../ui/passwordInput"
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Textarea } from "../ui/textarea"
import { Tag, TagInput } from "emblor";
import React, { useEffect, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils/utils"
import { Check, ChevronsUpDown } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command"
import Select from 'react-select'
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Checkbox } from "../ui/checkbox"
import { TimePicker } from "antd"
import dayjs from 'dayjs';


type TCustomFormFieldProps = {
    fieldId: string;
    formLabel?: string;
    label?: string;
    showError?: boolean;
    placeholder?: string;
    min?: number;
    max?: number;
    step?: number | "any";
    className?: string;
    elementName: "input" | "select" | "checkbox" | "radio" | "textarea" | "searchselect" | "multiselect" | "timepicker"
    isMulti?: boolean;
    inputType?: "email" | "text" | "password" | "phone" | "number";
    children?: React.ReactNode;
    selectOptions?: {
        value: string;
        label: string
    }[]

    defaultValue?: string | number | boolean | string[] | number[] | boolean[] | {
        value: string | number | boolean | string[] | number[] | boolean[]
        label: string
    } | {
        value: string | number | boolean | string[] | number[] | boolean[]
        label: string
    }[]

    defaultTime?: dayjs.ConfigType
}

type TFieldProps = TCustomFormFieldProps & {
    field: ControllerRenderProps<FieldValues, string>,
}
const RenderField = ({ children, className, step, min, max, defaultTime, elementName, defaultValue, field, isMulti = false, formLabel, fieldId, label, showError = true, placeholder, inputType, selectOptions }: TFieldProps) => {
    const form = useFormContext()
    switch (elementName) {
        case "input":
            return (
                <FormItem className={className}>
                    {formLabel && <FormLabel>{formLabel}</FormLabel>}
                    {label && <Label>{label}</Label>}
                    <FormControl>
                        {inputType === "password" ? <PasswordInput placeholder={placeholder} {...field} /> : inputType === "phone" ?

                            <div className="flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                                <PhoneInput
                                    {...field}
                                    defaultCountry="SS"
                                    className={"input-phone-number"}
                                    placeholder="Enter phone number"
                                    onChange={field.onChange}
                                />
                            </div> :

                            inputType === "number" ? <Input {...field} step={step} placeholder={placeholder} min={min || 0} max={max || 1000000} type={inputType} />
                                : <Input placeholder={placeholder}  {...field} type={inputType || "text"} />}
                    </FormControl>
                    {showError && <FormMessage />}
                </FormItem>
            )

        case "textarea":
            return (
                <FormItem className={className}>
                    {formLabel && <FormLabel>{formLabel}</FormLabel>}
                    {label && <Label>{label}</Label>}
                    <FormControl>
                        <Textarea placeholder={placeholder} {...field} rows={4} className="resize-none" />
                    </FormControl>
                    {showError && <FormMessage />}
                </FormItem>
            )
        case "select":
            if (!selectOptions) throw new Error("Options are not provided in Select Component")

            return (
                <FormItem className={className}>
                    {formLabel && <FormLabel>{formLabel}</FormLabel>}
                    {label && <Label>{label}</Label>}
                    <ShadcnSelect onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {selectOptions?.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                            )}
                        </SelectContent>
                    </ShadcnSelect>

                    {showError && <FormMessage />}
                </FormItem>
            )

        case "multiselect":
            if (!selectOptions) throw new Error("Options are not provided in Multi Select")
            return (
                <FormItem className={className}>
                    {formLabel && <FormLabel>{formLabel}</FormLabel>}
                    {label && <Label>{label}</Label>}
                    <Select isMulti={isMulti} defaultValue={field.value} options={selectOptions || []} onChange={field.onChange} />
                    {showError && <FormMessage />}
                </FormItem>
            )


        case "searchselect":
            return (
                <FormItem className="flex flex-col">
                    <FormLabel>Language</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        "w-[200px] justify-between",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value
                                        ? selectOptions?.find(
                                            (option) => option.value === field.value
                                        )?.label
                                        : "Select language"}
                                    <ChevronsUpDown className="opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput
                                    placeholder="Search framework..."
                                    className="h-9"
                                />
                                <CommandList>
                                    <CommandEmpty>No framework found.</CommandEmpty>
                                    <CommandGroup>
                                        {selectOptions?.map((option) => (
                                            <CommandItem
                                                value={option.label}
                                                key={option.value}
                                                onSelect={() => {
                                                    form.setValue(fieldId, option.value)
                                                }}
                                            >
                                                {option.label}
                                                <Check
                                                    className={cn(
                                                        "ml-auto",
                                                        option.value === field.value
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )

        case "radio":
            if (!selectOptions) throw new Error("Options are not provided in Radio Group")
            return (
                <FormItem className={className}>
                    {formLabel && <FormLabel>{formLabel}</FormLabel>}
                    {label && <Label>{label}</Label>}
                    <FormControl>
                        <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                        >
                            {selectOptions?.map((option) => (
                                <FormItem key={option.value} className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value={option.value} />
                                    </FormControl>
                                    <FormLabel className="font-normal capitalize">
                                        {option.label}</FormLabel>
                                </FormItem>
                            ))}
                        </RadioGroup>
                    </FormControl>

                    {showError && <FormMessage />}
                </FormItem>
            )

        case "checkbox":
            return (
                <FormItem className={cn("flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow", className)}>
                    <FormControl>
                        <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>
                            {label}
                        </FormLabel>
                        <FormDescription>
                            {placeholder}

                        </FormDescription>
                    </div>
                </FormItem>
            )

        case "timepicker":
            return (
                <FormItem className={className}>
                    {formLabel && <FormLabel>{formLabel}</FormLabel>}
                    {label && <Label>{label}</Label>}
                    <FormControl>
                        <TimePicker allowClear needConfirm={false} defaultValue={field.value ? dayjs(field.value, 'HH:mm') : undefined} format={'HH:mm'} size="large" onChange={(e) => form.setValue(fieldId, e.format('HH:mm'))} />
                    </FormControl>
                    {showError && <FormMessage />}
                </FormItem>
            )

        default:
            return (
                <FormItem className={className}>
                    {children}
                    {showError && <FormMessage />}
                </FormItem>
            )
    }
}
export const CustomFormField = ({ ...props }: TCustomFormFieldProps) => {
    const form = useFormContext()
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (props.formLabel && props.label) {
        throw Error("Both Formlabel and label cannot be exist together")
    }

    if (props.elementName == "select") {
        if (!props.selectOptions) {
            throw Error("Please provide selectOptions in {value:'', label:''}")
        }
    }

    if (!isClient) return null

    return (

        <FormField
            control={form.control}
            name={props.fieldId}

            render={({ field }) => (
                <RenderField
                    {...props}
                    field={field}
                />
            )}
        />

    )
}


type TDynamicTagField = Pick<TCustomFormFieldProps, "fieldId" | "label" | "placeholder" | "className"> & {
    defaultTags?: Tag[],

}

export const DynamicTagField = ({ ...props }: TDynamicTagField) => {
    const [tags, setTags] = React.useState<Tag[]>(props.defaultTags || []);
    const [activeTagIndex, setActiveTagIndex] = React.useState<number | null>(null);
    const form = useFormContext()
    return (
        <FormField
            control={form.control}

            name={props.fieldId}
            render={({ field }) => (
                <FormItem className={cn("flex flex-col items-start", props.className)}>
                    <FormLabel className="text-left">
                        {props.label}
                    </FormLabel>
                    <FormControl className="w-full">
                        <TagInput
                            {...field}
                            placeholder={props.placeholder}
                            styleClasses={{
                                input: 'shadow-none p-2',
                                inlineTagsContainer: ' p-2 rounded',
                                tag: {
                                    body: 'p-2',
                                },
                            }}

                            tags={tags}
                            className="sm:min-w-[450px]"
                            setTags={(newTags) => {
                                setTags(newTags);
                                form.setValue(props.fieldId, newTags as [Tag, ...Tag[]]);
                            }}
                            activeTagIndex={activeTagIndex}
                            setActiveTagIndex={setActiveTagIndex}
                        />
                    </FormControl>

                    <FormMessage />
                </FormItem>
            )}
        />
    )
}