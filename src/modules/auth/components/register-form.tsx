import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { AxiosError, HttpStatusCode } from 'axios';
import { ComponentRef, useRef, useState } from 'react';

import { Form } from '@/base/components/ui/form';
import { getTranslation } from '@/base/utils';
import { UserProfileForm } from '@/modules/users/components/user-profile-form';
import { usersService } from '@/modules/users/services/users.service';
import { UpdateUserSchema, User } from '@/modules/users/types';

import { authService } from '../services/auth.service';
import { RegisterSchema, registerSchema } from '../types';
import { getTokensFromCookie } from '../utils/get-tokens-from-cookie.util';

interface RegisterFormProps {
  step?: number;
  onStepChange?: (step: number) => void;
}

export function RegisterForm({ step: initialStep, onStepChange }: RegisterFormProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState(initialStep ?? 1);
  const [user, setUser] = useState<User>();

  const { mutate: triggerUpdateUserProfile, isPending: isUpdating } = useMutation({
    mutationFn: (payload: UpdateUserSchema) => usersService.updateUserProfile(payload),
    onSuccess: () => {
      navigate({ to: '/', replace: true });
    },
  });

  switch (step) {
    case 1:
      return (
        <RegisterFormStep1
          onContinue={async () => {
            const { user } = await getTokensFromCookie();
            setUser(user);
            setStep(2);
            onStepChange?.(2);
          }}
        />
      );
    case 2:
      return (
        <UserProfileForm
          user={user}
          loading={isUpdating}
          renderSubmitButton={(Button) => (
            <Button>
              {getTranslation('modules.auth.components.RegisterForm.step2SubmitButtonLabel')}
            </Button>
          )}
          onSuccessSubmit={(data) => triggerUpdateUserProfile(data)}
        />
      );
    default:
      return null;
  }
}

interface RegisterFormStep1Props {
  onContinue?: () => void;
}

function RegisterFormStep1({ onContinue }: RegisterFormStep1Props) {
  const formRef = useRef<ComponentRef<typeof Form<Partial<RegisterSchema>, RegisterSchema>>>(null);

  const { mutate: triggerRegister } = useMutation({
    mutationFn: (payload: RegisterSchema) => authService.register(payload),
    onSuccess: () => {
      onContinue?.();
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response?.status === HttpStatusCode.Conflict) {
        formRef.current?.setError('email', {
          type: 'email_already_registered',
        });
      }
    },
  });

  return (
    <Form
      i18nNamespace='modules.auth.components.RegisterFormStep1'
      ref={formRef}
      schema={registerSchema}
      fields={[
        {
          name: 'email',
          type: 'text',
        },
        {
          name: 'password',
          type: 'password',
        },
      ]}
      onSuccessSubmit={(data) => triggerRegister(data)}
    />
  );
}
