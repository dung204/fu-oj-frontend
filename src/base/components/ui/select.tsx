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
} & (
  | {
      /** Allow the select to select multiple values */
      multiple?: false;
      /** Currently selected value */
      value?: any;
      /** Callback when selection changes */
      onChange?: (value: any | undefined) => void;
    }
  | {
      /** Allow the select to select multiple values */
      multiple: true;
      /** Currently selected values */
      value?: any[];
      /** Callback when selection changes */
      onChange?: (value: any[]) => void;
    }
);

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
  const [selectedValue, setSelectedValue] = useState(() => {
    if (value && !multiple) {
      return value;
    }
    return undefined;
  });
  const [selectedValues, setSelectedValues] = useState(() => {
    if (value && multiple) {
      return value as any[];
    }
    return [];
  });
  const [selectedOption, setSelectedOption] = useState<SelectOption | undefined>(() => {
    if (value && !multiple) {
      const selected = options.find(
        (option) => JSON.stringify(option.value) === JSON.stringify(value)
      );
      return selected;
    }
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
    if (!multiple) {
      const newValue =
        clearable && currentValue === JSON.stringify(selectedValue)
          ? undefined
          : JSON.parse(currentValue);
      setSelectedValue(newValue);
      setSelectedOption(
        options.find((option) => JSON.stringify(option.value) === JSON.stringify(newValue))
      );
      setSearchTerm('');
      onChange?.(newValue);
      setOpen(false);
      return;
    }

    const newValues =
      clearable && selectedValues.map((val) => JSON.stringify(val)).includes(currentValue)
        ? selectedValues.filter((val) => val !== currentValue)
        : [...selectedValues, JSON.parse(currentValue)];
    setSelectedValues(newValues);

    setSelectedOptions(
      clearable && selectedOptions.some((opt) => JSON.stringify(opt.value) === currentValue)
        ? selectedOptions.filter((opt) => JSON.stringify(opt.value) !== currentValue)
        : [
            ...selectedOptions,
            options.find((opt) => JSON.stringify(opt.value) === currentValue) ?? {
              value: JSON.parse(currentValue),
              label: currentValue,
            },
          ]
    );

    setSearchTerm('');
    onChange?.(newValues);
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
            'w-full justify-between truncate',
            disabled && 'cursor-not-allowed opacity-50',
            {
              'text-muted-foreground':
                (multiple && selectedValues.length === 0) || (!multiple && !selectedValue),
            },
            triggerClassName
          )}
          disabled={disabled}
        >
          <SelectTriggerContent
            getDisplayValue={getDisplayValue}
            multiple={!!multiple}
            placeholder={placeholder}
            selectedOption={selectedOption}
            selectedOptions={selectedOptions}
          />
          <ChevronsUpDown className='opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn('w-(--radix-popover-trigger-width) rounded-2xl p-0', className)}
      >
        <Command shouldFilter={false} className='rounded-2xl'>
          {searchable && (
            <div className='relative w-full border-b'>
              <CommandInput
                placeholder={`Search...`}
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
                        'opacity-100':
                          (!multiple &&
                            JSON.stringify(selectedValue) === JSON.stringify(option.value)) ||
                          (multiple &&
                            selectedValues
                              .map((val) => JSON.stringify(val))
                              .includes(JSON.stringify(option.value))),
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
  extends Required<Pick<SelectProps, 'multiple' | 'getDisplayValue' | 'placeholder'>> {
  selectedOption: SelectOption | undefined;
  selectedOptions: SelectOption[];
}

function SelectTriggerContent({
  multiple,
  getDisplayValue,
  placeholder,
  selectedOption,
  selectedOptions,
}: SelectTriggerContentProps) {
  if (!multiple) return selectedOption ? getDisplayValue(selectedOption) : placeholder;

  if (selectedOptions.length === 0) return placeholder;

  if (selectedOptions.length === 1) return <span>{getDisplayValue(selectedOptions[0])}</span>;

  if (selectedOptions.length === 2)
    return (
      <span>
        {getDisplayValue(selectedOptions[0])}, {getDisplayValue(selectedOptions[1])}
      </span>
    );

  return (
    <span>
      {getDisplayValue(selectedOptions[0])}, {getDisplayValue(selectedOptions[1])}, and{' '}
      {selectedOptions.length - 2} more...
    </span>
  );
}
