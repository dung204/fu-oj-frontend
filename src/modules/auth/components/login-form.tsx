import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { AxiosError, HttpStatusCode } from 'axios';
import { ComponentRef, useRef } from 'react';
import { DeepPartial } from 'react-hook-form';

import { Form } from '@/base/components/ui/form';

import { authService } from '../services/auth.service';
import { LoginSchema, loginSchema } from '../types';

type LoginFormRef = ComponentRef<typeof Form<DeepPartial<LoginSchema>, LoginSchema>>;

export function LoginForm() {
  const formRef = useRef<LoginFormRef>(null);
  const navigate = useNavigate();
  const { mutate: triggerLogin, isPending: isLoggingIn } = useMutation({
    mutationFn: async (data: LoginSchema) => authService.login(data),
    onSuccess: () => {
      navigate({ to: '/' });
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.status === HttpStatusCode.Unauthorized) {
        formRef.current?.setError('email', {
          type: 'email_password_incorrect',
        });
        formRef.current?.setError('password', {
          type: 'email_password_incorrect',
        });
      }
    },
  });

  return (
    <Form
      ref={formRef}
      i18nNamespace='modules.auth.components.LoginForm'
      className='flex flex-col gap-6'
      loading={isLoggingIn}
      schema={loginSchema}
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
      onSuccessSubmit={(data) => triggerLogin(data)}
      onErrorSubmit={(errors) => console.log('Errors: ', errors)}
    />
  );
}
