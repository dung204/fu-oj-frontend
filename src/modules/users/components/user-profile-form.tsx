import { DeepPartial } from 'react-hook-form';

import { Form, FormProps } from '@/base/components/ui/form';

import { UpdateUserSchema, User, updateUserSchema } from '../types';

import { UserAvatarUploader } from './user-avatar-uploader';

interface UserProfileFormProps
  extends Omit<
    FormProps<DeepPartial<UpdateUserSchema>, Required<UpdateUserSchema>>,
    'schema' | 'fields'
  > {
  user: User | undefined;
}

export function UserProfileForm({ user, defaultValues, ...props }: UserProfileFormProps) {
  return (
    <Form
      i18nNamespace='modules.users.components.UserProfileForm'
      schema={updateUserSchema.required()}
      fields={[
        {
          name: 'avatar',
          type: 'custom',
          controlRender: ({ field: { value, onChange } }) => (
            <UserAvatarUploader
              user={user}
              images={value}
              onImagesChange={onChange}
              className='size-20 border-2 [&_svg]:size-10'
            />
          ),
          render: ({ Control }) => (
            <div className='flex items-center justify-center'>
              <Control />
            </div>
          ),
        },
        {
          name: 'firstName',
          type: 'text',
        },
        {
          name: 'lastName',
          type: 'text',
        },
      ]}
      defaultValues={
        defaultValues ?? {
          firstName: user?.firstName || '',
          lastName: user?.lastName || '',
          avatar: user?.avatar
            ? [
                {
                  file: null,
                  previewUrl: user?.avatar?.url || '',
                },
              ]
            : [],
        }
      }
      {...props}
    />
  );
}
