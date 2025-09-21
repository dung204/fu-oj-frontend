import { DeepPartial } from 'react-hook-form';

import { Form, FormProps } from '@/base/components/ui/form';

import { CreatePostSchema, createPostSchema } from '../types';

type PostFormProps = Omit<
  FormProps<DeepPartial<CreatePostSchema>, CreatePostSchema>,
  'schema' | 'fields' | 'i18nNamespace'
>;

export function PostForm(props: PostFormProps) {
  return (
    <Form
      i18nNamespace='modules.posts.components.PostForm'
      schema={createPostSchema}
      fields={[
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'content',
          type: 'textarea',
        },
        {
          name: 'isPublic',
          type: 'switch',
        },
      ]}
      {...props}
    />
  );
}
