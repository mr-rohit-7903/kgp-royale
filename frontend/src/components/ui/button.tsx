import * as React from "react";;
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-outfit uppercase tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-2 border-foreground rounded-full shadow-hard hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-hard-hover active:translate-y-0.5 active:translate-x-0.5 active:shadow-hard-active",
        destructive:
          "bg-destructive text-destructive-foreground border-2 border-foreground rounded-full shadow-hard hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-hard-hover active:translate-y-0.5 active:translate-x-0.5 active:shadow-hard-active",
        outline:
          "border-2 border-foreground bg-transparent text-foreground rounded-full hover:bg-tertiary shadow-none hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-hard active:translate-y-0.5 active:translate-x-0.5 active:shadow-none",
        secondary:
          "bg-secondary text-secondary-foreground border-2 border-foreground rounded-full shadow-hard hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-hard-hover active:translate-y-0.5 active:translate-x-0.5 active:shadow-hard-active",
        ghost: "hover:bg-muted hover:text-foreground rounded-full",
        link: "text-primary underline-offset-4 hover:underline",
        gold: "bg-tertiary text-foreground border-2 border-foreground rounded-full shadow-hard hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-hard-hover active:translate-y-0.5 active:translate-x-0.5 active:shadow-hard-active",
        royal: "bg-primary text-primary-foreground border-2 border-foreground rounded-full shadow-hard hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-hard-hover active:translate-y-0.5 active:translate-x-0.5 active:shadow-hard-active",
        nav: "text-foreground hover:bg-tertiary border-2 border-transparent hover:border-foreground transition-all rounded-full px-4 py-2 hover:shadow-hard",
        navActive: "bg-tertiary text-foreground border-2 border-foreground shadow-hard rounded-full px-4 py-2",
      },
      size: {
        default: "h-12 px-6 py-3 text-base",
        sm: "h-10 rounded-xl px-4 text-sm",
        lg: "h-14 rounded-2xl px-8 text-lg",
        xl: "h-16 rounded-2xl px-10 text-xl",
        icon: "h-12 w-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
