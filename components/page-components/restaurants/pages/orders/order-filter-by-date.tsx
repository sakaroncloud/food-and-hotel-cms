"use client";
import React from "react";
import { useCustomSearchParams } from "@/hooks/useCustomSearchParams";
import { DatePicker, DatePickerProps } from "antd";
import { Label } from "@/components/ui/label";


type Props = {
    label: string;
    fieldId: string;
}
export const OrderFilterByDate = ({ label, fieldId }: Props) => {
    const { createQueryString, searchParams, deleteQueryString } =
        useCustomSearchParams();

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        if (typeof dateString === 'string') {
            createQueryString(fieldId, dateString);
        }
        else {
            deleteQueryString(fieldId);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <Label>{label}</Label>
            <DatePicker onChange={onChange} className="h-11" />
        </div>
    );
};