/** biome-ignore-all lint/performance/noDynamicNamespaceImportAccess: locale is dynamic */

import { format } from 'date-fns';
import * as locales from 'date-fns/locale';
import { ChevronsUpDown, ClockIcon } from 'lucide-react';
import { useId, useState } from 'react';
import { DateRange } from 'react-day-picker';

import { Button } from '@/base/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/base/components/ui/popover';
import { TimeInput } from '@/base/components/ui/time-picker';
import { cn } from '@/base/lib';
import { getTranslation } from '@/base/utils';
import { getLocale } from '@/i18n/runtime';

interface TimeRangePickerProps {
  /** The controlled date state. */
  dateRange?: DateRange;
  /** The date state setter function */
  onDateRangeChange?: (date: DateRange) => void;
  /** Whether the time picker is disabled. */
  disabled?: boolean;
  /** Whether the time picker is read only. */
  readOnly?: boolean;
  /** The placeholder text to display when no date is selected. */
  placeholder?: string;
  /** Whether to include seconds in the time picker. */
  includeSeconds?: boolean;
  /** Custom trigger button class names */
  triggerClassName?: string;
}

export function TimeRangePicker({
  disabled,
  readOnly,
  placeholder,
  includeSeconds,
  triggerClassName,
  ...props
}: TimeRangePickerProps) {
  const locale = getLocale();

  const id = useId();
  const [dateRange, setDateRange] = useState(props.dateRange);
  const [versionFromInput, setVersionFromInput] = useState(0);
  const [versionToInput, setVersionToInput] = useState(0);

  const formatString = includeSeconds ? 'pp' : 'p';

  const handleChangeDateRange = (dateRange: DateRange) => {
    setDateRange(dateRange);
    props.onDateRangeChange?.(dateRange);
  };

  return (
    <Popover>
      <PopoverTrigger asChild onClick={readOnly ? (e) => e.preventDefault() : undefined}>
        <Button
          id={`date-range-picker-${id}`}
          variant={'outline'}
          className={cn(
            'w-full min-w-0 justify-start text-left font-normal',
            !dateRange && 'text-muted-foreground',
            triggerClassName
          )}
          disabled={disabled}
        >
          <ClockIcon />
          {renderPickerText({
            formatString,
            defaultPlaceholder: getTranslation('base.components.ui.TimeRangePicker.placeholder'),
            placeholder,
            locale,
            dateRange,
          })}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto' align='center'>
        <div className='flex items-center gap-2'>
          <div className='space-y-2'>
            <TimeInput
              key={versionFromInput}
              date={dateRange?.from}
              onSetToNow={() => setVersionFromInput(versionToInput + 1)}
              onDateChange={(date) =>
                handleChangeDateRange({
                  from: date,
                  to: dateRange?.to,
                })
              }
              includeSeconds={includeSeconds}
            />
          </div>
          <ChevronsUpDown className='text-muted-foreground size-6' />
          <div className='space-y-2'>
            <TimeInput
              key={versionToInput}
              date={dateRange?.to}
              onDateChange={(date) =>
                handleChangeDateRange({
                  from: dateRange?.from,
                  to: date,
                })
              }
              onSetToNow={() => setVersionToInput(versionToInput + 1)}
              includeSeconds={includeSeconds}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function renderPickerText({
  formatString,
  dateRange,
  defaultPlaceholder,
  placeholder,
  locale,
}: {
  formatString: string;
  defaultPlaceholder: string;
  locale?: string;
  dateRange?: DateRange;
  placeholder?: string;
}) {
  if (dateRange?.from) {
    if (dateRange.to) {
      return `${format(dateRange.from, formatString, { locale: locales[locale as keyof typeof locales] })} - ${format(dateRange.to, formatString, { locale: locales[locale as keyof typeof locales] })}`;
    }
    return format(dateRange.from, formatString, {
      locale: locales[locale as keyof typeof locales],
    });
  }
  return placeholder ?? defaultPlaceholder;
}
