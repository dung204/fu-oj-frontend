import { useNavigate } from '@tanstack/react-router';
import { SearchIcon } from 'lucide-react';
import { ComponentProps, useEffect, useState } from 'react';

import { InputGroup, InputGroupAddon, InputGroupInput } from '@/base/components/ui/input-group';
import { useDebounce } from '@/base/hooks';

interface SearchInputProps
  extends Omit<ComponentProps<typeof InputGroupInput>, 'type' | 'onChange' | 'value'> {
  searchField: string;
  debounceDelay?: number;
  value?: string;
  onChange?: (value: string) => void;
}

export function SearchInput({
  value,
  searchField,
  debounceDelay,
  onChange,
  ...props
}: SearchInputProps) {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState(value ?? '');
  const debouncedSearchTerm = useDebounce(searchTerm, debounceDelay ?? 300);

  useEffect(() => {
    if (debouncedSearchTerm === '') return;

    navigate({
      to: '.',
      search: { [searchField]: debouncedSearchTerm },
    });
    onChange?.(debouncedSearchTerm);
  }, [debouncedSearchTerm, navigate, searchField, onChange]);

  return (
    <InputGroup>
      <InputGroupInput
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          if (e.target.value === '') {
            navigate({
              to: '.',
            });
          }
        }}
        {...props}
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
}
