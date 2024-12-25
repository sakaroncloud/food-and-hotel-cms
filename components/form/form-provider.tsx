"use client"

import { PropsWithChildren, useEffect, useState } from "react"

type Props = {
} & PropsWithChildren

const FormProvider = ({ children }: Props) => {
    const [client, setClient] = useState(false)

    useEffect(() => {
        setClient(true)
    }, [])
    if (!client) return "Loading..."
    return (
        children
    )
}

export default FormProvider