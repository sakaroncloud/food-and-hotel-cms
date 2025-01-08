
import { cn } from "@/lib/utils/utils"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image";

import Logo from "@/public/logo.png"
import FallbackImage from "../fallback-image";

type Props = {
    cardTitle: string;
    cardDescription: string;
    children: React.ReactNode
}

const AuthWrapper = ({ children, cardTitle, cardDescription }: Props) => {
    return (

        <div className="space-y-5 bg-white rounded-3xl  sm:p-10 p-6 flex-1 w-full">
            <div className="flex items-center justify-between gap-4">
                <div className="w-fit">
                    <FallbackImage
                        type="rectangle"
                        src={Logo}
                        alt="Site Logo"
                        height={80}
                        width={120}
                    />
                </div>
                <div className="text-gray-600">Welcome Back!</div>
            </div>
            <Card className={cn("md:w-[480px] w-full border-0 space-y-4 shadow-none")} >
                <CardHeader className="p-0">
                    <CardTitle>
                        {cardTitle}
                    </CardTitle>
                    <CardDescription>{cardDescription}</CardDescription>
                </CardHeader>
                <CardContent className="p-0 shadow-none w-full">
                    {children}
                </CardContent>
            </Card>
        </div>

    )
}

export default AuthWrapper