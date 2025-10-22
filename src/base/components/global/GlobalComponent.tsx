import { observer } from 'mobx-react-lite';

import { LRComponent } from '@/modules/LR/LRComponent';

export const GlobalComponent = observer(() => {
  return <LRComponent />;
});
