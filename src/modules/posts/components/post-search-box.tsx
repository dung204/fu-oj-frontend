import { useRouter } from '@tanstack/react-router';
import { SearchIcon, XCircleIcon } from 'lucide-react';
import { ComponentProps, useEffect, useState } from 'react';

import { Input } from '@/base/components/ui/input';
import { useDebounce } from '@/base/hooks';
import { getTranslation } from '@/base/utils';

interface PostSearchBoxProps extends Omit<ComponentProps<typeof Input>, 'value' | 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
}

export function PostSearchBox({ value: initialValue, onChange, ...props }: PostSearchBoxProps) {
  const router = useRouter();

  const [value, setValue] = useState(initialValue ?? '');
  const debouncedValue = useDebounce(value, 300);

  useEffect(() => {
    if (value === '') {
      router.navigate({
        to: '.',
      });
      return;
    }

    router.navigate({
      to: '.',
      search: (old) => ({
        ...old,
        ...(debouncedValue && { title: debouncedValue }),
      }),
    });
    onChange?.(debouncedValue);
  }, [debouncedValue, router, onChange, value]);

  return (
    <Input
      placeholder={getTranslation('modules.posts.components.PostSearchBox.placeholder')}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      prefix={<SearchIcon className='size-4' />}
      postfix={
        value && <XCircleIcon onClick={() => setValue('')} className='size-4 cursor-pointer' />
      }
      {...props}
    />
  );
}
