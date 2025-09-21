import { ComponentProps } from 'react';

import { cn } from '@/base/lib';

export type InputProps = Omit<ComponentProps<'input'>, 'prefix' | 'postfix'> & {
  prefix?: React.ReactNode;
  postfix?: React.ReactNode;
};

export function Input({ className, prefix, postfix, ...props }: InputProps) {
  return (
    <label
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex gap-2 h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm items-center cursor-text',
        'has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-ring/50 has-[input:focus-visible]:ring-[3px]',
        'has-[input[aria-invalid="true"]]:ring-error/20 dark:has-[input[aria-invalid="true"]]:ring-error/40 has-[input[aria-invalid="true"]]:border-error',
        className
      )}
    >
      {prefix}
      <input
        data-slot='input'
        className='w-full rounded-none border-0 p-0! outline-none focus-visible:ring-0'
        {...props}
      />
      {postfix}
    </label>
  );
}
