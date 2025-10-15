import { Eye, EyeOff } from 'lucide-react';
import { ComponentProps, useState } from 'react';

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
      <InputGroupAddon align='inline-end'>
        <Icon className='size-4 cursor-pointer' onClick={() => setShowPassword(!showPassword)} />
      </InputGroupAddon>
    </InputGroup>
  );
}
