
import { cn } from "@/lib/utils"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image";

import Logo from "@/public/logo.png"

type Props = {
    cardTitle: string;
    cardDescription: string;
    children: React.ReactNode
}

const AuthWrapper = ({ children, cardTitle, cardDescription }: Props) => {
    return (

        <div className="space-y-4">
            <div className="w-fit mx-auto">
                <Image
                    src={Logo}
                    alt="Site Logo"
                    height={80}
                    width={120}
                />
            </div>
            <Card className={cn("w-[380px]")} >
                <CardHeader>
                    <CardTitle>
                        {cardTitle}
                    </CardTitle>
                    <CardDescription>{cardDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                    {children}
                </CardContent>

            </Card>
        </div>

    )
}

export default AuthWrapper