import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { toast } from 'sonner';

import { BackButton } from '@/base/components/ui/back-button';
import { getTranslation } from '@/base/utils';

import { UserProfileForm } from '../components/user-profile-form';
import { usersService } from '../services/users.service';
import { UpdateUserSchema, User } from '../types';

interface UpdateProfilePageProps {
  user: User;
}

export function UpdateUserProfilePage({ user }: UpdateProfilePageProps) {
  const router = useRouter();

  const { mutate: triggerUpdateUserProfile, isPending: isUpdating } = useMutation({
    mutationFn: (payload: UpdateUserSchema) => usersService.updateUserProfile(payload),
    onSuccess: () => {
      toast.success(
        getTranslation('modules.users.pages.UpdateUserProfilePage.updateSuccessNotification')
      );
      router.navigate({ to: '.', replace: true });
    },
  });

  return (
    <section className='space-y-8'>
      <div className='flex flex-col gap-3'>
        <BackButton />
        <h2 className='font-medium text-xl'>
          {getTranslation('modules.users.pages.UpdateUserProfilePage.title')}
        </h2>
      </div>
      <UserProfileForm
        loading={isUpdating}
        user={user}
        onSuccessSubmit={(data) => triggerUpdateUserProfile(data)}
      />
    </section>
  );
}
