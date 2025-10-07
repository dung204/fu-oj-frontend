import { Eye, EyeOff } from 'lucide-react';
import { ComponentProps, useState } from 'react';

import { Button } from '@/base/components/ui/button';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/base/components/ui/input-group';

interface PasswordInputProps extends Omit<ComponentProps<typeof InputGroupInput>, 'type'> {
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
    <InputGroup>
      <InputGroupInput type={showPassword ? 'text' : 'password'} {...props} />
      <InputGroupAddon>
        <Button
          type='button'
          variant='ghost'
          onClick={() => setShowPassword(!showPassword)}
          size='icon'
          className='size-max'
        >
          <Icon className='size-4' />
        </Button>
      </InputGroupAddon>
    </InputGroup>
  );
}
