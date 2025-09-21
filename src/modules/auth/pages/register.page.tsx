import { useState } from 'react';

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

import { RegisterForm } from '../components/register-form';

export function RegisterPage() {
  const [step, setStep] = useState(1);

  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <div className='flex flex-col gap-6'>
          <Card>
            <CardHeader>
              <BackButton />
              <CardTitle>
                {getTranslation(`modules.auth.pages.RegisterPage.step${step}.title`)}
              </CardTitle>
              <CardDescription>
                {getTranslation(`modules.auth.pages.RegisterPage.step${step}.subtitle`)}
              </CardDescription>
              <CardAction>
                <LanguageSwitcher />
              </CardAction>
            </CardHeader>
            <CardContent>
              <RegisterForm step={step} onStepChange={setStep} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
