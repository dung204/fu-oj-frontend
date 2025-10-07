import { GroupCard } from '@/modules/groups/components/group-card';
import { GroupsSearchParams } from '@/modules/groups/types';

interface MyGroupsPageProps {
  searchParams: GroupsSearchParams;
}

export function MyGroupsPage(_: MyGroupsPageProps) {
  // TODO: integrate with API

  return (
    <section className='grid grid-cols-3 gap-x-4 gap-y-8'>
      {Array.from({ length: 12 }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: replace with group id later
        <GroupCard key={`my-group-card-${index}`} />
      ))}
    </section>
  );
}
