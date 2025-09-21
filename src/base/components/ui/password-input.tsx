import { Eye, EyeOff } from 'lucide-react';
import { ComponentProps, useState } from 'react';

import { Button } from '@/base/components/ui/button';
import { Input } from '@/base/components/ui/input';

interface PasswordInputProps extends Omit<ComponentProps<typeof Input>, 'type'> {
  defaultShowPassword?: boolean;
}

export function PasswordInput({
  className,
  defaultShowPassword,
  disabled,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(!!defaultShowPassword);

  const Icon = showPassword ? EyeOff : Eye;

  return (
    <Input
      type={showPassword ? 'text' : 'password'}
      postfix={
        <Button
          type='button'
          variant='ghost'
          onClick={() => setShowPassword(!showPassword)}
          size='icon'
          className='size-max'
        >
          <Icon className='size-4' />
        </Button>
      }
      disabled={disabled}
      {...props}
    />
  );
}
