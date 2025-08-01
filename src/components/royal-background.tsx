
export function RoyalBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-secondary">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-background" />
      <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-radial from-primary/10 via-primary/5 to-transparent rounded-full animate-pulse" />
      <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-radial from-accent/10 via-accent/5 to-transparent rounded-full animate-pulse animation-delay-3000" />
    </div>
  );
}
