import { Avatar, AvatarImage } from '@/base/components/ui/avatar';
import { getLocale, setLocale } from '@/i18n/runtime';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './dropdown-menu';

const languages = [
  { code: 'en', label: 'English', img: '/united-kingdom.svg' },
  { code: 'vi', label: 'Tiếng Việt', img: '/vietnam.svg' },
] as const;

export function LanguageSwitcher() {
  const locale = getLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className='cursor-pointer'>
          <AvatarImage
            src={languages.find((lang) => lang.code === locale)?.img}
            alt={locale}
            className='object-cover object-center'
          />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {languages.map((lang) => (
          <DropdownMenuCheckboxItem
            key={lang.code}
            checked={locale === lang.code}
            onCheckedChange={() => setLocale(lang.code)}
          >
            <Avatar className='size-5'>
              <AvatarImage src={lang.img} alt={lang.label} className='object-cover object-center' />
            </Avatar>
            {lang.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
