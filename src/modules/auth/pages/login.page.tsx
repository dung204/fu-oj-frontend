import { BackButton } from '@/base/components/ui/back-button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/base/components/ui/card';
import { LanguageSwitcher } from '@/base/components/ui/language-switcher';
import { getTranslation } from '@/base/utils';

import { LoginForm } from '../components/login-form';

export function LoginPage() {
  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <div className='flex flex-col gap-6'>
          <Card>
            <CardHeader>
              <BackButton />
              <CardTitle>{getTranslation('modules.auth.pages.LoginPage.title')}</CardTitle>
              <CardDescription>
                {getTranslation('modules.auth.pages.LoginPage.subtitle')}
              </CardDescription>
              <CardAction>
                <LanguageSwitcher />
              </CardAction>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
