import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
import { ArchiveRestore, Edit, Eye, RefreshCcw, Trash } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

type EditProps = {
    path?: string;
} & ButtonProps;

export const EditButton = ({ path, ...props }: EditProps) => {
    return (

        <TooltipProvider delayDuration={300}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        {...props}
                        size="sm"
                        asChild
                        className="outline-0 cursor-pointer shadow-none bg-transparent text-gray-800 p-0 hover:bg-transparent hover:text-primary hover:text-gray-800"
                    >
                        {path ? <Link href={path || "/"}>
                            <Edit className="mr-2 size-4 text-blue-500" />
                        </Link> : <Edit className="mr-2 size-4 text-blue-500" />
                        }
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Edit</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export const NativeEditButton = () => {
    return (
        <button className={buttonVariants({ variant: "outline" })}>
            <Edit className="mr-2 size-4" /> <span className="text-sm text-blue-500">Edit</span>
        </button>
    );
};

export const DeleteButton = ({ ...props }: ButtonProps) => {
    return (
        <TooltipProvider delayDuration={300}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        {...props}
                        size="sm"
                        className="outline-0 shadow-none bg-transparent text-red-500 p-0 hover:bg-transparent hover:text-primary hover:text-gray-800"
                    >
                        <Trash className="mr-2 size-4 text-primary" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Delete</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

    );
};

export const DeleteForeverButton = ({ ...props }: ButtonProps) => {
    return (
        <TooltipProvider delayDuration={300}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        {...props}
                        size="sm"
                        className="outline-0 shadow-none bg-transparent text-red-500 p-0 hover:bg-transparent hover:text-primary hover:text-gray-800"
                    >
                        <Trash className="mr-2 size-4 text-primary" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Delete Permanently</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

    );
};
export const RestoreButton = ({ ...props }: ButtonProps) => {
    return (
        <TooltipProvider delayDuration={300}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        {...props}
                        size="sm"
                        className="outline-0 shadow-none bg-transparent text-red-500 p-0 hover:bg-transparent hover:text-primary hover:text-gray-800"
                    >
                        <RefreshCcw />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Restore</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

    );
};



export const ViewIcon = ({ path, ...props }: EditProps) => {
    return (

        <TooltipProvider delayDuration={300}>

            <Tooltip>
                <TooltipTrigger asChild>

                    <Button
                        {...props}
                        size="sm"
                        asChild
                        className="outline-0 shadow-none bg-transparent text-gray-800 p-0 hover:bg-transparent hover:text-primary hover:text-gray-800"
                    >
                        <Link href={path || "/"}>
                            <Eye className="mr-2 size-4 text-green-500" />
                        </Link>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>View</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>



    );
};