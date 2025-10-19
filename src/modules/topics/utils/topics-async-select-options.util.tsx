import { AsyncSelectProps } from '@/base/components/ui/async-select';
import { CommonSearchParams } from '@/base/types';
import { topicsService } from '@/modules/topics/services/topics.service';
import { Topic, TopicsSearchParams } from '@/modules/topics/types';

export function getTopicsAsyncSelectOptions(
  searchBy: Exclude<keyof TopicsSearchParams, keyof CommonSearchParams | 'sorting'>
): Omit<AsyncSelectProps<Topic>, 'value' | 'onChange'> {
  return {
    queryKey: (searchTerm) => (!searchTerm ? ['topics'] : ['users', { [searchBy]: searchTerm }]),
    queryFn: (searchTerm) => topicsService.getAllTopics({ [searchBy]: searchTerm }),
    getDisplayValue: (topic) => topic.name,
    getOptionValue: (topic) => topic.id,
    renderOption: (topic) => <span>{topic.name}</span>,
  };
}
