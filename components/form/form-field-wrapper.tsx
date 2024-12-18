import React, { forwardRef, PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SubmitButton from "./submit-button";

type Props = {
    className?: string;
    label: string;
    description: string;
} & PropsWithChildren;

interface FormFooterProps {
    className?: string;
    buttonLabel: string;
    pending: boolean;
    goBack?: {
        path: string
    }
}

export const FormFieldWrapper = ({
    label,
    description,
    className,
    children,
}: Props) => {
    return (
        <div
            className={cn(
                "flex lg:flex-row flex-col justify-between gap-6 py-6",
                className
            )}
        >
            <div className="lg:basis-1/4  basis-full shrink-0 py-6">
                <Label>{label}</Label>
                <p className="text-muted-foreground text-sm mt-4 ">{description}</p>
            </div>

            <div className="bg-white p-8 rounded-lg border flex-wrap gap-4 shadow-sm flex-1 h-full  flex">
                {children}
            </div>
        </div>
    );
};

const FormFooter = forwardRef<HTMLDivElement, FormFooterProps>(
    ({ className, buttonLabel, pending, goBack }, ref) => {
        const router = useRouter()
        return (
            <div
                ref={ref}
                className={cn("flex justify-between gap-20 flex-1 py-6", className)}
            >
                {goBack &&

                    <Button
                        type="button"
                        onClick={() => router.push(goBack.path)}
                        variant={"outline"}
                        className="space-x-3"
                    >
                        <ArrowLeftIcon className="size-4 " />
                        <span> Go Back</span>
                    </Button>
                }

                <SubmitButton type="submit" label={buttonLabel} pending={pending} />
            </div>
        )
    }
);

FormFooter.displayName = "FormFooter";

export { FormFooter };