import * as React from "react";;
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-title uppercase tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-2 border-royal-dark rounded-2xl shadow-blue hover:brightness-110 active:translate-y-1 active:shadow-none",
        destructive:
          "bg-destructive text-destructive-foreground border-2 border-red-900 rounded-2xl shadow-chunky hover:brightness-110 active:translate-y-1 active:shadow-none",
        outline:
          "border-2 border-accent bg-transparent text-accent rounded-2xl hover:bg-accent hover:text-accent-foreground shadow-gold active:translate-y-1 active:shadow-none",
        secondary:
          "bg-secondary text-secondary-foreground border-2 border-border rounded-2xl shadow-chunky hover:brightness-110 active:translate-y-1 active:shadow-none",
        ghost: "hover:bg-accent/20 hover:text-accent rounded-xl",
        link: "text-accent underline-offset-4 hover:underline",
        gold: "bg-gradient-to-b from-accent to-gold-dark text-accent-foreground border-2 border-gold-dark rounded-2xl shadow-gold hover:brightness-110 active:translate-y-1 active:shadow-none animate-pulse-glow",
        royal: "bg-gradient-to-b from-primary to-royal-dark text-primary-foreground border-2 border-royal-dark rounded-2xl shadow-blue hover:brightness-110 active:translate-y-1 active:shadow-none",
        nav: "text-foreground/80 hover:text-accent transition-colors rounded-xl px-4 py-2",
        navActive: "text-accent bg-accent/10 rounded-xl px-4 py-2 border-b-2 border-accent",
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
