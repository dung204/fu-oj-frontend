import { useRouter } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';
import { ComponentProps } from 'react';

import { cn } from '@/base/lib';
import { getTranslation } from '@/base/utils';

import { Button } from './button';

type BackButtonProps = Omit<ComponentProps<typeof Button>, 'onClick' | 'children'>;

export function BackButton({ variant, className, ...props }: BackButtonProps) {
  const router = useRouter();

  return (
    <Button
      variant={variant ?? 'ghost'}
      className={cn('w-max text-muted-foreground', className)}
      onClick={() =>
        router.history.canGoBack() ? router.history.back() : router.navigate({ to: '/' })
      }
      {...props}
    >
      <ArrowLeftIcon />
      {getTranslation('base.components.ui.BackButton.label')}
    </Button>
  );
}
