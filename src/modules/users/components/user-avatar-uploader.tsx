import { CameraIcon } from 'lucide-react';
import { ComponentProps } from 'react';

import { ImageUploader } from '@/base/components/ui/image-uploader';
import { LoadingIndicator } from '@/base/components/ui/loading-indicator';
import { cn } from '@/base/lib';

import { User } from '../types';

import { UserAvatar } from './user-avatar';

interface UserAvatarUploaderProps
  extends Omit<ComponentProps<typeof ImageUploader>, 'render' | 'multiple'> {
  user: User | undefined;
  className?: string;
}

export function UserAvatarUploader({ user, className, ...props }: UserAvatarUploaderProps) {
  return (
    <ImageUploader
      {...props}
      render={({ images, isUploadingFromLocal, triggerFileInput, disabled, readOnly }) => (
        // biome-ignore lint/a11y/noStaticElementInteractions: this is a div that acts like a button
        <div
          className={cn('relative', {
            'cursor-not-allowed': disabled,
            'cursor-default': readOnly,
          })}
          onClick={triggerFileInput}
        >
          <UserAvatar user={user} src={images[0]?.previewUrl} className={className} />
          <div
            className={cn(
              'absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/70 opacity-0 transition-opacity hover:opacity-100',
              {
                'pointer-events-none opacity-100': isUploadingFromLocal,
              }
            )}
          >
            {!isUploadingFromLocal ? (
              <CameraIcon className='size-6 text-accent' />
            ) : (
              <LoadingIndicator className='size-6 text-accent' />
            )}
          </div>
        </div>
      )}
    />
  );
}
