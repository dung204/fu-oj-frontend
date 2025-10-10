import { Button } from '@/base/components/ui/button';
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
    <div className='relative flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <img
        src='/fpt-auth-background.jpg'
        alt='Auth background'
        className='absolute inset-0 object-cover object-center size-full z-10'
      />
      <div className='absolute inset-0 bg-black/40 z-20'></div>
      <div className='w-full max-w-sm z-30'>
        <Card>
          <div className='flex justify-center'>
            <img src='/favicon.svg' alt='FPT University logo' className='h-20 w-auto' />
          </div>
          <CardHeader className='gap-x-6'>
            <CardTitle>{getTranslation('modules.auth.pages.LoginPage.title')}</CardTitle>
            <CardDescription>
              {getTranslation('modules.auth.pages.LoginPage.subtitle')}
            </CardDescription>
            <CardAction>
              <LanguageSwitcher />
            </CardAction>
          </CardHeader>
          <CardContent className='space-y-4'>
            <LoginForm />
            <Button variant='outline' className='w-full'>
              <img src='/google-logo.svg' alt='Google logo' />
              {getTranslation('modules.auth.pages.LoginPage.loginWithGoogle')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
