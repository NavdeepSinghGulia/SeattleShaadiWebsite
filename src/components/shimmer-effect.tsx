
import { cn } from "@/lib/utils";

interface ShimmerEffectProps {
  children: React.ReactNode;
  className?: string;
}

export function ShimmerEffect({ children, className }: ShimmerEffectProps) {
  return (
    <div className={cn("relative overflow-hidden group", className)}>
      {children}
      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-shimmer" />
    </div>
  );
}
