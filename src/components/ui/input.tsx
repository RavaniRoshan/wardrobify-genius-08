
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inputVariants = cva(
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        default: "",
        search: "pl-9", // Leave space for the search icon
        withIcon: "pl-9",
      },
      size: {
        default: "h-10",
        sm: "h-8 text-xs",
        lg: "h-12 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, size, icon, iconPosition = "left", ...props }, ref) => {
    if (icon) {
      return (
        <div className="relative w-full">
          <div className={`absolute ${iconPosition === "left" ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none`}>
            {icon}
          </div>
          <input
            type={type}
            className={cn(
              inputVariants({ 
                variant: iconPosition === "left" ? "withIcon" : undefined,
                size,
                className 
              }),
              iconPosition === "right" && "pr-9"
            )}
            ref={ref}
            {...props}
          />
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
)
Input.displayName = "Input"

export { Input }
