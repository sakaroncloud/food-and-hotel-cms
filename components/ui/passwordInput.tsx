import * as React from "react"

import { cn } from "@/lib/utils"
import { Eye, EyeClosed, EyeOff } from "lucide-react"

const PasswordInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const [show, setShow] = React.useState(false)
    return (
      <div className="relative h-11  flex flex-col items-center justify-center">
        <input
          type={show ? "text" : "password"}
          className={cn(
            "flex h-11 w-full pr-7 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          ref={ref}
          {...props}
        />
        <span className="absolute right-3 cursor-pointer" onClick={() => setShow(!show)}>
          {show ? <Eye className="size-5" /> : <EyeOff className="size-5" />}

        </span>
      </div>
    )
  }
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
