import React from "react";

export const CustomCell = ({
    label,
}: {
    label: string | number | undefined;
}) => {
    return <div className="capitalize text-gray-700">{label}</div>;
};