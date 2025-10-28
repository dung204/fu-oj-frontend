/** biome-ignore-all lint/suspicious/noExplicitAny: any is needed for the option's value */
import { CheckIcon, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';
import { useId, useState } from 'react';

import { Button } from '@/base/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/base/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/base/components/ui/popover';
import { cn } from '@/base/lib';
import { getTranslation } from '@/base/utils';

export type SelectOption = {
  value: any;
  label: string;
  disabled?: boolean;
  description?: string;
  icon?: React.ReactNode;
};

type SelectProps = {
  /** List of options to display */
  options: SelectOption[];
  /** Function to render each option */
  renderOption?: (option: SelectOption) => React.ReactNode;
  /** Function to get the display value for the selected option */
  getDisplayValue?: (option: SelectOption) => React.ReactNode;
  /** Custom not found message */
  notFound?: React.ReactNode;
  /** Placeholder text when no selection */
  placeholder?: string;
  /** Disable the entire select */
  disabled?: boolean;
  /** Custom class names */
  className?: string;
  /** Custom trigger button class names */
  triggerClassName?: string;
  /** Custom no results message */
  noResultsMessage?: string;
  /** Allow clearing the selection */
  clearable?: boolean;
  /** Allow searching through options */
  searchable?: boolean;
  /** Allow the select to select multiple values */
  multiple?: boolean;
  /** Currently selected values */
  value?: any[];
  /** Callback when selection changes */
  onChange?: (value: any[]) => void;
};

export function Select({
  options,
  renderOption,
  getDisplayValue = (option) => option.label,
  notFound,
  placeholder = 'Select...',
  disabled = false,
  className,
  triggerClassName,
  noResultsMessage,
  clearable = true,
  searchable = true,
  value,
  onChange,
  multiple,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState(() => {
    if (value && multiple) {
      return value as any[];
    }
    return [];
  });
  const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>(() => {
    if (value && multiple) {
      const selected = options.filter((option) =>
        (value as any[]).map((val) => JSON.stringify(val)).includes(JSON.stringify(option.value))
      );
      return selected;
    }

    return [];
  });
  const [searchTerm, setSearchTerm] = useState('');

  const id = useId();

  const handleSelect = (currentValue: string) => {
    let newValues: any[];

    if (clearable && selectedValues.map((val) => JSON.stringify(val)).includes(currentValue)) {
      newValues = selectedValues.filter((val) => JSON.stringify(val) !== currentValue);
    } else if (!multiple) {
      newValues = [JSON.parse(currentValue)];
    } else {
      newValues = [...selectedValues, JSON.parse(currentValue)];
    }

    let newOptions: SelectOption[];

    if (clearable && selectedOptions.some((opt) => JSON.stringify(opt.value) === currentValue)) {
      newOptions = selectedOptions.filter((opt) => JSON.stringify(opt.value) !== currentValue);
    } else if (!multiple) {
      newOptions = [
        options.find((opt) => JSON.stringify(opt.value) === currentValue) ?? {
          value: JSON.parse(currentValue),
          label: currentValue,
        },
      ];
    } else {
      newOptions = [
        ...selectedOptions,
        options.find((opt) => JSON.stringify(opt.value) === currentValue) ?? {
          value: JSON.parse(currentValue),
          label: currentValue,
        },
      ];
    }

    setSelectedValues(newValues);
    setSelectedOptions(newOptions);
    setSearchTerm('');
    onChange?.(newValues);
    if (!multiple) {
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          type='button'
          role='combobox'
          aria-expanded={open}
          className={cn(
            'w-full justify-between flex min-w-0',
            disabled && 'cursor-not-allowed opacity-50',
            {
              'text-muted-foreground': selectedValues.length === 0,
            },
            triggerClassName
          )}
          disabled={disabled}
        >
          <div className='truncate text-left'>
            <SelectTriggerContent
              getDisplayValue={getDisplayValue}
              placeholder={placeholder}
              selectedOptions={selectedOptions}
            />
          </div>
          <ChevronsUpDown className='opacity-50 shrink-0' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn('w-(--radix-popover-trigger-width) rounded-2xl p-0', className)}
      >
        <Command shouldFilter={false} className='rounded-2xl'>
          {searchable && (
            <div className='relative w-full border-b'>
              <CommandInput
                placeholder={getTranslation('base.components.ui.Select.search')}
                value={searchTerm}
                onValueChange={(value) => {
                  setSearchTerm(value);
                }}
              />
            </div>
          )}
          <CommandList>
            {options.length === 0 &&
              (notFound || <CommandEmpty>{noResultsMessage ?? `No items found.`}</CommandEmpty>)}
            <CommandGroup>
              {options
                .filter(
                  (option) =>
                    searchTerm === '' ||
                    option.label.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((option) => (
                  <CommandItem
                    key={`${id}-option-${option.value}`}
                    value={JSON.stringify(option.value)}
                    onSelect={handleSelect}
                    className='rounded-xl'
                  >
                    {!renderOption ? option.label : renderOption(option)}
                    <CheckIcon
                      className={cn('ml-auto h-3 w-3 opacity-0', {
                        'opacity-100': selectedValues
                          .map((val) => JSON.stringify(val))
                          .includes(JSON.stringify(option.value)),
                      })}
                    />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

interface SelectTriggerContentProps
  extends Required<Pick<SelectProps, 'getDisplayValue' | 'placeholder'>> {
  selectedOptions: SelectOption[];
}

function SelectTriggerContent({
  getDisplayValue,
  placeholder,
  selectedOptions,
}: SelectTriggerContentProps) {
  if (selectedOptions.length === 0) return placeholder;

  return <span>{selectedOptions.map(getDisplayValue).join(', ')}</span>;
}
