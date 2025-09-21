import { cn } from '@/base/lib';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='skeleton'
      className={cn('bg-muted-foreground animate-pulse rounded-lg', className)}
      {...props}
    />
  );
}

export { Skeleton };
