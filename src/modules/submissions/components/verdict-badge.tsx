import { ComponentProps, CSSProperties } from 'react';

import { Badge } from '@/base/components/ui/badge';
import { cn } from '@/base/lib';
import { verdicts } from '@/modules/submissions/constants/verdicts.constant';

interface VerdictBadgeProps extends ComponentProps<typeof Badge> {
  verdict: keyof typeof verdicts;
}

export function VerdictBadge({ verdict, className, style, ...props }: VerdictBadgeProps) {
  return (
    <Badge
      className={cn(
        'border-transparent bg-(--verdict-color) text-white [a&]:hover:bg-(--verdict-color)/90 focus-visible:ring-(--verdict-color)/20 dark:focus-visible:ring-(--verdict-color)/40 dark:bg-(--verdict-color)/60',
        className
      )}
      style={{ '--verdict-color': verdicts[verdict].color, ...style } as CSSProperties}
      {...props}
    >
      {verdicts[verdict].shortName}
    </Badge>
  );
}
