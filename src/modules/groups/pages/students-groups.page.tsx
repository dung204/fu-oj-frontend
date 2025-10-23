import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';
import { AxiosError, HttpStatusCode } from 'axios';
import { CircleXIcon, GlobeIcon, LogInIcon, SearchIcon, UserIcon, UsersIcon } from 'lucide-react';
import { ComponentProps, useRef, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/base/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/base/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/base/components/ui/dialog';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '@/base/components/ui/empty';
import { Form, FormRef } from '@/base/components/ui/form';
import { Input } from '@/base/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/base/components/ui/tabs';
import { Pagination, PaginationSkeleton } from '@/base/layouts/pagination';
import { cn } from '@/base/lib';
import { getTranslation } from '@/base/utils';
import { GroupCard, GroupCardSkeleton } from '@/modules/groups/components/group-card';
import { groupsService } from '@/modules/groups/services/groups.service';
import { groupsQueryOptions } from '@/modules/groups/utils/groups-query-options.util';

import { GroupsSearchParams, JoinGroupPayload, joinGroupPayloadSchema } from '../types';

interface GroupsPageProps {
  searchParams: GroupsSearchParams;
}

export function StudentsGroupsPage({ searchParams }: GroupsPageProps) {
  const [joinGroupByCodeDialogOpen, setJoinGroupByCodeDialogOpen] = useState(false);

  const {
    data: {
      data: groups,
      metadata: { pagination },
    },
  } = useSuspenseQuery(groupsQueryOptions(searchParams));

  return (
    <div className='grid gap-4 grid-cols-4'>
      <section className='col-span-3 flex flex-col gap-4'>
        <h1 className='text-2xl'>
          {getTranslation(
            searchParams.tab === 'mine'
              ? `modules.groups.pages.GroupsPage.myGroups`
              : `modules.groups.pages.GroupsPage.publicGroups`
          )}
        </h1>
        <hr className='border-b border-border' />
        <section>
          <div className='flex justify-between'>
            <nav className='flex'>
              <Link
                to='.'
                search={{ ...searchParams, tab: 'mine' }}
                className={cn(
                  'flex items-center gap-2 px-4 py-3 rounded-t-xl border border-b-0 shadow-sm z-10 relative font-medium cursor-pointer',
                  {
                    'bg-primary text-white border-primary': searchParams.tab === 'mine',
                  }
                )}
              >
                <UserIcon />
                {getTranslation('modules.groups.pages.GroupsPage.myGroups')}
              </Link>
              <Link
                to='.'
                search={{ ...searchParams, tab: 'public' }}
                className={cn(
                  'flex items-center gap-2 px-4 py-3 rounded-t-xl border border-b-0 shadow-sm z-10 relative font-medium cursor-pointer',
                  {
                    'bg-primary text-white border-primary': searchParams.tab === 'public',
                  }
                )}
              >
                <GlobeIcon />
                {getTranslation('modules.groups.pages.GroupsPage.publicGroups')}
              </Link>
            </nav>
            <JoinGroupByCodeDialog
              open={joinGroupByCodeDialogOpen}
              onOpenChange={setJoinGroupByCodeDialogOpen}
            />
          </div>
          <Card className='z-20 relative rounded-tl-none'>
            <CardContent>
              <section className={cn({ 'grid grid-cols-3 gap-x-4 gap-y-8': groups.length > 0 })}>
                {groups.length === 0 ? (
                  <GroupsEmpty />
                ) : (
                  groups.map((group) => <GroupCard key={group.id} group={group} />)
                )}
              </section>
            </CardContent>
            <CardFooter>
              <Pagination pagination={pagination} />
            </CardFooter>
          </Card>
        </section>
      </section>
      <section className='col-span-1 flex flex-col gap-4'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <SearchIcon className='size-4' />{' '}
              {getTranslation('modules.groups.pages.GroupsPage.groupSearch')}
            </CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            <Input
              placeholder={getTranslation('modules.groups.pages.GroupsPage.groupSearchPlaceholder')}
            />
          </CardContent>
          <CardFooter className='justify-end gap-2'>
            <Button type='button' variant='outline'>
              <CircleXIcon />
              {getTranslation('modules.groups.pages.GroupsPage.clearSearch')}
            </Button>
            <Button type='button'>
              <SearchIcon /> {getTranslation('modules.groups.pages.GroupsPage.applySearch')}
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}

function JoinGroupByCodeDialog(props: ComponentProps<typeof Dialog>) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const formRef = useRef<FormRef<JoinGroupPayload>>(null);

  const { mutate: triggerJoinGroup, isPending: isJoining } = useMutation({
    mutationFn: async (payload: JoinGroupPayload) => groupsService.joinGroup(payload),
    onSuccess: ({ data: { id } }) => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      props.onOpenChange?.(false);
      toast.success(getTranslation('modules.groups.components.GroupCard.joinSuccess'));
      navigate({
        to: '/groups/$groupId',
        params: { groupId: id },
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.status === HttpStatusCode.NotFound) {
        formRef.current?.setError('code', { type: 'not_found' });
        return;
      }

      if (error instanceof AxiosError && error.status === HttpStatusCode.Conflict) {
        formRef.current?.setError('code', { type: 'already_joined' });
        return;
      }

      formRef.current?.setError('code', { type: 'unknown' });
    },
  });

  return (
    <Dialog {...props}>
      <DialogTrigger asChild>
        <Button>
          <LogInIcon />
          {getTranslation('modules.groups.pages.GroupsPage.JoinGroupByCodeDialog.buttonLabel')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {getTranslation('modules.groups.pages.GroupsPage.JoinGroupByCodeDialog.title')}
          </DialogTitle>
          <DialogDescription>
            {getTranslation('modules.groups.pages.GroupsPage.JoinGroupByCodeDialog.description')}
          </DialogDescription>
        </DialogHeader>
        <Form
          ref={formRef}
          i18nNamespace='modules.groups.pages.GroupsPage.JoinGroupByCodeDialog.Form'
          loading={isJoining}
          schema={joinGroupPayloadSchema}
          fields={[
            {
              name: 'code',
              type: 'otp',
              render: ({ Control, Message }) => (
                <>
                  <Control
                    inputProps={{ maxLength: 8 }}
                    slotProps={{
                      className: 'rounded-md text-xl font-semibold size-12 border! border-primary',
                    }}
                  />
                  <Message />
                </>
              ),
            },
          ]}
          renderSubmitButton={(Button) => (
            <DialogFooter>
              <Button />
            </DialogFooter>
          )}
          onSuccessSubmit={(payload) => triggerJoinGroup(payload)}
        />
      </DialogContent>
    </Dialog>
  );
}

function GroupsEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <UsersIcon className='text-muted-foreground/70' />
        </EmptyMedia>
        <EmptyTitle className='text-muted-foreground/70'>No groups found.</EmptyTitle>
      </EmptyHeader>
    </Empty>
  );
}

export function GroupsPageSkeleton({ searchParams }: GroupsPageProps) {
  const navigate = useNavigate();

  const navigateToTab = (tab: GroupsSearchParams['tab']) => {
    navigate({
      to: '.',
      search: (old) => ({
        ...old,
        tab,
      }),
    });
  };

  return (
    <div className='grid gap-4 grid-cols-4'>
      <section className='col-span-3 flex flex-col gap-4'>
        <h1 className='text-2xl'>{getTranslation('modules.groups.pages.GroupsPage.title')}</h1>
        <hr className='border-b border-border' />
        <Card>
          <CardContent>
            <Tabs defaultValue={searchParams.tab}>
              <div className='flex items-center justify-between'>
                <TabsList>
                  <TabsTrigger
                    value='mine'
                    onClick={() => navigateToTab('mine')}
                    className='data-[state=active]:bg-primary data-[state=active]:text-white'
                  >
                    <UserIcon />
                    {getTranslation('modules.groups.pages.GroupsPage.myGroups')}
                  </TabsTrigger>
                  <TabsTrigger
                    value='public'
                    onClick={() => navigateToTab('public')}
                    className='data-[state=active]:bg-primary data-[state=active]:text-white'
                  >
                    <GlobeIcon />
                    {getTranslation('modules.groups.pages.GroupsPage.publicGroups')}
                  </TabsTrigger>
                </TabsList>
                <Button>
                  <LogInIcon />
                  {getTranslation('modules.groups.pages.GroupsPage.joinGroupByCode')}
                </Button>
              </div>
              <TabsContent value={searchParams.tab}>
                <section className='grid grid-cols-3 gap-x-4 gap-y-8'>
                  {Array.from({ length: 12 }).map((_, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: static skeletons
                    <GroupCardSkeleton key={`group-card-skeleton-${index}`} />
                  ))}
                </section>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <PaginationSkeleton />
          </CardFooter>
        </Card>
      </section>
      <section className='col-span-1 flex flex-col gap-4'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <SearchIcon className='size-4' />{' '}
              {getTranslation('modules.groups.pages.GroupsPage.groupSearch')}
            </CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            <Input
              placeholder={getTranslation('modules.groups.pages.GroupsPage.groupSearchPlaceholder')}
              disabled
            />
          </CardContent>
          <CardFooter className='justify-end gap-2'>
            <Button type='button' variant='outline' disabled>
              <CircleXIcon />
              {getTranslation('modules.groups.pages.GroupsPage.clearSearch')}
            </Button>
            <Button type='button' disabled>
              <SearchIcon /> {getTranslation('modules.groups.pages.GroupsPage.applySearch')}
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}
