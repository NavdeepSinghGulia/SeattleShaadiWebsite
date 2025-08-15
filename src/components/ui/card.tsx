import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { 
    luxurious?: boolean;
    hoverEffect?: boolean;
  }
>(({ className, luxurious = false, hoverEffect = false, ...props }, ref) => {
  const baseClasses = "rounded-lg border bg-card text-card-foreground shadow-sm relative";
  const luxuryClasses = luxurious ? 
    "border-primary/30 shadow-md backdrop-blur-sm before:absolute before:inset-0 before:rounded-lg before:border before:border-primary/10 before:p-px" : 
    "";
  const hoverClasses = hoverEffect ? 
    "transition-all duration-300 hover:shadow-lg hover:border-primary/40 hover:-translate-y-1" : 
    "";

  return (
    <div
      ref={ref}
      className={cn(
        baseClasses,
        luxuryClasses,
        hoverClasses,
        className
      )}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    decorative?: boolean;
  }
>(({ className, decorative = false, ...props }, ref) => {
  const baseClasses = "flex flex-col space-y-1.5 p-6";
  const decorativeClasses = decorative ? 
    "border-b border-primary/10 pb-4 relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[3px] after:w-16 after:bg-primary/30 after:rounded-full" : 
    "";

  return (
    <div
      ref={ref}
      className={cn(baseClasses, decorativeClasses, className)}
      {...props}
    />
  )
})
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    elegant?: boolean;
  }
>(({ className, elegant = false, ...props }, ref) => {
  const baseClasses = "text-2xl font-semibold leading-none tracking-tight";
  const elegantClasses = elegant ? 
    "font-playfair text-primary font-bold" : 
    "";

  return (
    <h3
      ref={ref}
      className={cn(baseClasses, elegantClasses, className)}
      {...props}
    />
  )
})
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    decorative?: boolean;
  }
>(({ className, decorative = false, ...props }, ref) => {
  const baseClasses = "flex items-center p-6 pt-0";
  const decorativeClasses = decorative ? 
    "border-t border-primary/10 mt-4 pt-4" : 
    "";

  return (
    <div
      ref={ref}
      className={cn(baseClasses, decorativeClasses, className)}
      {...props}
    />
  )
})
CardFooter.displayName = "CardFooter"

// New animated luxury card component
const LuxuryCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    glowEffect?: boolean;
    hoverAnimation?: boolean;
  }
>(({ className, glowEffect = true, hoverAnimation = true, children, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      className={cn(
        "rounded-lg border border-primary/20 bg-card/95 backdrop-blur-sm text-card-foreground shadow-sm relative overflow-hidden",
        className
      )}
      initial={{ opacity: 0.9 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={hoverAnimation ? { 
        y: -5,
        boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.1)",
        borderColor: "hsl(var(--primary) / 0.4)"
      } : {}}
      {...props}
    >
      {glowEffect && (
        <motion.div 
          className="absolute inset-0 opacity-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10"
          animate={{
            opacity: [0, 0.1, 0],
            x: ['-100%', '100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 5,
            ease: "easeInOut"
          }}
        />
      )}
      {children}
    </motion.div>
  )
})
LuxuryCard.displayName = "LuxuryCard"

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  LuxuryCard
}

