import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";

type EditProps = {
    path: string;
} & ButtonProps;

export const EditButton = ({ path, ...props }: EditProps) => {
    return (
        <Button
            {...props}
            size="sm"
            asChild
            className="outline-0 shadow-none bg-transparent text-gray-800 p-0 hover:bg-transparent hover:text-primary hover:text-gray-800"
        >
            <Link href={path || "/"}>
                <Edit className="mr-2 size-4" />
            </Link>
        </Button>
    );
};

export const NativeEditButton = () => {
    return (
        <button className={buttonVariants({ variant: "outline" })}>
            <Edit className="mr-2 size-4" /> <span className="text-sm">Edit</span>
        </button>
    );
};

export const DeleteButton = ({ ...props }: ButtonProps) => {
    return (
        <Button
            {...props}
            size="sm"
            className="outline-0 shadow-none bg-transparent text-red-500 p-0 hover:bg-transparent hover:text-primary hover:text-gray-800"
        >
            <Trash className="mr-2 size-4" />
        </Button>
    );
};