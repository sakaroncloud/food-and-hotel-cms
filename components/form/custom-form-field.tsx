"use client"

import { ControllerRenderProps, FieldValues, useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { PasswordInput } from "../ui/passwordInput"
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Textarea } from "../ui/textarea"


type TCustomFormFieldProps = {
    fieldId: string;
    formLabel?: string;
    label?: string;
    showError?: boolean;
    placeholder?: string;
    className?: string;
    elementName: "input" | "select" | "checkbox" | "textarea";
    inputType?: "email" | "text" | "password" | "phone";
    children?: React.ReactNode;
    selectOptions?: {
        value: string;
        label: string
    }[]

}

type TFieldProps = TCustomFormFieldProps & {
    field: ControllerRenderProps<FieldValues, string>,
}
const RenderField = ({ children, className, elementName, field, formLabel, label, showError = true, placeholder, inputType, selectOptions }: TFieldProps) => {
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
                                    defaultCountry="KE"
                                    className={"input-phone-number"}
                                    placeholder="Enter phone number"
                                    onChange={field.onChange}
                                />
                            </div>
                            : <Input placeholder={placeholder} {...field} type={inputType || "text"} />}
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
            return (
                <FormItem className={className}>
                    {formLabel && <FormLabel>{formLabel}</FormLabel>}
                    {label && <Label>{label}</Label>}
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {selectOptions?.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                            )}
                        </SelectContent>
                    </Select>

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

    if (props.formLabel && props.label) {
        throw Error("Both Formlabel and label cannot be exist together")
    }

    if (props.elementName == "select") {
        if (!props.selectOptions) {
            throw Error("Please provide selectOptions in {value:'', label:''}")
        }
    }

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


