
import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  icon?: React.ReactNode;
  label?: string;
  helperText?: string;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, icon, label, helperText, error, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const combinedRef = useCombinedRefs(ref, textareaRef);
    
    // Auto expand textarea height as content grows
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const target = e.target;
      
      // Reset height to auto to get the correct scrollHeight
      target.style.height = 'auto';
      
      // Set the height to scrollHeight to make it expand
      target.style.height = `${target.scrollHeight}px`;
      
      // Call the original onChange handler if provided
      props.onChange?.(e);
    };
    
    return (
      <div className={cn("space-y-2", error && "has-error")}>
        {label && (
          <label className="text-sm font-medium text-foreground block">
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-3 text-muted-foreground">
              {icon}
            </div>
          )}
          
          <textarea
            className={cn(
              "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              icon && "pl-9",
              error && "border-destructive focus-visible:ring-destructive",
              className
            )}
            ref={combinedRef}
            onChange={handleChange}
            {...props}
          />
        </div>
        
        {helperText && !error && (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        )}
        
        {error && (
          <p className="text-xs text-destructive">{error}</p>
        )}
      </div>
    );
  }
)
Textarea.displayName = "Textarea"

// Helper function to combine refs
function useCombinedRefs<T>(...refs: React.Ref<T>[]) {
  const targetRef = React.useRef<T>(null);

  React.useEffect(() => {
    refs.forEach(ref => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        (ref as React.MutableRefObject<T | null>).current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
}

export { Textarea }
