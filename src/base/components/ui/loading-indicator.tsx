import { LoaderCircleIcon } from 'lucide-react';
import { ComponentProps } from 'react';

import { cn } from '@/base/lib';

export function LoadingIndicator({ className, ...props }: ComponentProps<typeof LoaderCircleIcon>) {
  return <LoaderCircleIcon className={cn('animate-spin', className)} {...props} />;
}
