import { InfiniteData, UseInfiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

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
import { useDebounce } from '@/base/hooks';
import { cn } from '@/base/lib';
import type { SuccessResponse } from '@/base/types';
import { getTranslation } from '@/base/utils';

import { LoadingIndicator } from './loading-indicator';

export type AsyncSelectProps<T> = {
  /** Query key for Tanstack Query, the search term is appended to this key */
  queryKey: (searchTerm: string) => unknown[];
  /** Async function to fetch options */
  queryFn: (searchTerm: string, page: number) => Promise<SuccessResponse<T[]>>;
  /** Function to render each option */
  renderOption: (option: T) => React.ReactNode;
  /** Function to get the value from an option */
  getOptionValue: (option: T) => string;
  /** Function to get the display value for the selected option */
  getDisplayValue: (option: T) => React.ReactNode;
  /** Custom not found message */
  notFound?: React.ReactNode;
  /** Custom loading skeleton */
  loadingSkeleton?: React.ReactNode;
  /** Label for the select field */
  label?: string;
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
  /** Allow the select to select multiple values */
  multiple?: boolean;
  /** Currently selected values */
  value?: string[];
  /** Callback when selection changes */
  onChange?: (value: string[]) => void;
} & Omit<
  UseInfiniteQueryOptions<
    SuccessResponse<T[]>,
    Error,
    InfiniteData<SuccessResponse<T[]>>,
    SuccessResponse<T[]>,
    unknown[],
    number
  >,
  | 'queryKey'
  | 'queryFn'
  | 'initialPageParam'
  | 'getNextPageParam'
  | 'getPreviousPageParam'
  | 'initialData'
>;

export function AsyncSelect<T>({
  queryKey,
  queryFn,
  renderOption,
  getOptionValue,
  getDisplayValue,
  notFound,
  loadingSkeleton,
  label = 'item',
  placeholder = 'Select...',
  disabled = false,
  className,
  triggerClassName,
  noResultsMessage,
  clearable = true,
  multiple,
  value,
  onChange,
  ...useInfiniteQueryOptions
}: AsyncSelectProps<T>) {
  const { inView, ref } = useInView();
  const [open, setOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const {
    data: res,
    isFetchingNextPage,
    isPending,
    isFetching,
    error,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: queryKey(debouncedSearchTerm),
    queryFn: ({ pageParam }) => queryFn(debouncedSearchTerm, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage: SuccessResponse<T[]>) =>
      lastPage.metadata.pagination.hasNextPage
        ? lastPage.metadata.pagination.currentPage + 1
        : undefined,
    getPreviousPageParam: (firstPage: SuccessResponse<T[]>) =>
      firstPage.metadata.pagination.hasPreviousPage
        ? firstPage.metadata.pagination.currentPage - 1
        : undefined,
    ...useInfiniteQueryOptions,
  });

  const options: T[] = res?.pages.flatMap((p) => p.data) || [];

  const [selectedValues, setSelectedValues] = useState(() => {
    if (value && multiple) {
      return value as string[];
    }
    return [];
  });

  const [selectedOptions, setSelectedOptions] = useState<T[]>(() => {
    if (value && multiple) {
      const selected = options.filter((opt) => (value as string[]).includes(getOptionValue(opt)));
      return selected || [];
    }
    return [];
  });

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, fetchNextPage]);

  const handleSelect = (currentValue: string) => {
    let newValues: string[];

    if (clearable && selectedValues.includes(currentValue)) {
      newValues = selectedValues.filter((val) => val !== currentValue);
    } else if (!multiple) {
      newValues = [currentValue];
    } else {
      newValues = [...selectedValues, currentValue];
    }

    let newOptions: T[];

    if (clearable && selectedOptions.some((opt) => getOptionValue(opt) === currentValue)) {
      newOptions = selectedOptions.filter((opt) => getOptionValue(opt) !== currentValue);
    } else if (!multiple) {
      newOptions = [options.find((opt) => getOptionValue(opt) === currentValue)!];
    } else {
      newOptions = [
        ...selectedOptions,
        options.find((opt) => getOptionValue(opt) === currentValue)!,
      ];
    }

    setSelectedValues(newValues);
    setSelectedOptions(newOptions);
    if (!multiple) {
      setOpen(false);
    }
    onChange?.(newValues);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn(
            'w-full justify-between flex min-w-0',
            disabled && 'cursor-not-allowed opacity-50',
            triggerClassName
          )}
          disabled={disabled}
        >
          <div className='truncate text-left'>
            <AsyncSelectTriggerContent<T>
              getDisplayValue={getDisplayValue}
              placeholder={placeholder}
              selectedOptions={selectedOptions}
            />
          </div>
          <ChevronsUpDown className='opacity-50 shrink-0' size={10} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn('w-(--radix-popover-trigger-width) p-0', className)}>
        <Command shouldFilter={false}>
          <div className='relative w-full border-b'>
            <CommandInput
              placeholder={getTranslation('base.components.ui.AsyncSelect.search')}
              value={searchTerm}
              onValueChange={setSearchTerm}
            />
            {isFetching && (
              <div className='absolute top-1/2 right-2 flex -translate-y-1/2 transform items-center'>
                <Loader2 className='h-4 w-4 animate-spin' />
              </div>
            )}
          </div>
          <CommandList>
            {error && <div className='text-destructive p-4 text-center'>{error.message}</div>}
            {isPending && (loadingSkeleton || <DefaultLoadingSkeleton />)}
            {!isPending &&
              !error &&
              options.length === 0 &&
              (notFound || (
                <CommandEmpty>
                  {noResultsMessage ?? `Không tìm thấy ${label.toLowerCase()}`}
                </CommandEmpty>
              ))}
            {!isPending && (
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={getOptionValue(option)}
                    value={getOptionValue(option)}
                    onSelect={handleSelect}
                  >
                    {renderOption(option)}
                    <Check
                      className={cn('ml-auto h-3 w-3 opacity-0', {
                        'opacity-100': selectedValues.includes(getOptionValue(option)),
                      })}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            <div ref={ref} className='flex w-full justify-center'>
              {isFetchingNextPage && <LoadingIndicator className='size-4' />}
            </div>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

interface AsyncSelectTriggerContentProps<T>
  extends Pick<AsyncSelectProps<T>, 'getDisplayValue' | 'placeholder'> {
  selectedOptions: T[];
}

function AsyncSelectTriggerContent<T>({
  getDisplayValue,
  placeholder,
  selectedOptions,
}: AsyncSelectTriggerContentProps<T>) {
  if (selectedOptions.length === 0) return placeholder;

  return <span>{selectedOptions.map(getDisplayValue).join(', ')}</span>;
}

function DefaultLoadingSkeleton() {
  return (
    <CommandGroup>
      {[1, 2, 3].map((i) => (
        <CommandItem key={i} disabled>
          <div className='flex w-full items-center gap-2'>
            <div className='bg-muted h-6 w-6 animate-pulse rounded-full' />
            <div className='flex flex-1 flex-col gap-1'>
              <div className='bg-muted h-4 w-24 animate-pulse rounded' />
              <div className='bg-muted h-3 w-16 animate-pulse rounded' />
            </div>
          </div>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}
