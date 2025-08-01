
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedDiv } from './animated-div';
import { ShimmerEffect } from './shimmer-effect';

interface LuxuryCardProps {
  title: string;
  subtitle: string;
  content: string;
  delay?: number;
}

export function LuxuryCard({ title, subtitle, content, delay = 0 }: LuxuryCardProps) {
  return (
    <AnimatedDiv delay={delay} animation="fadeInScale">
      <ShimmerEffect>
        <div className="p-px bg-gradient-to-br from-amber-500/50 via-rose-500/50 to-amber-500/50 rounded-lg">
          <Card className="border-none shadow-2xl bg-gradient-to-br from-secondary/60 via-secondary/40 to-background/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-headline text-3xl font-bold bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
                {title}
              </CardTitle>
              <p className="text-primary font-semibold text-lg">{subtitle}</p>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{content}</p>
            </CardContent>
          </Card>
        </div>
      </ShimmerEffect>
    </AnimatedDiv>
  );
}
