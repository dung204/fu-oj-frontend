import { ChevronDown } from 'lucide-react';

import { getLocale, setLocale } from '@/i18n/runtime';

import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './dropdown-menu';

export function LanguageSwitcher() {
  const locale = getLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          {locale.toUpperCase()}
          <ChevronDown className='text-muted-foreground' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuCheckboxItem
          checked={locale === 'en'}
          onCheckedChange={(checked) => {
            if (checked) {
              setLocale('en');
            }
          }}
        >
          EN
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={locale === 'vi'}
          onCheckedChange={(checked) => {
            if (checked) {
              setLocale('vi');
            }
          }}
        >
          VI
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
