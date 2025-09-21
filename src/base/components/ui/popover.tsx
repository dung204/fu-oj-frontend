import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/base/lib';

const popoverVariants = cva(
  'z-50 w-72 rounded-lg border bg-popover p-4 text-popover-foreground shadow-md outline-hidden print:hidden',
  {
    defaultVariants: {
      animate: true,
    },
    variants: {
      animate: {
        true: 'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
      },
    },
  }
);

function Popover({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot='popover' {...props} />;
}

function PopoverTrigger({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot='popover-trigger' {...props} />;
}

function PopoverContent({
  className,
  align = 'center',
  sideOffset = 4,
  animate,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content> & VariantProps<typeof popoverVariants>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot='popover-content'
        align={align}
        sideOffset={sideOffset}
        className={cn(popoverVariants({ animate, className }))}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

function PopoverAnchor({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot='popover-anchor' {...props} />;
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor, popoverVariants };
