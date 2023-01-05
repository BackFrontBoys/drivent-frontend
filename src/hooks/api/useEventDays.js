import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activityApi from '../../services/activityApi';

export default async function useEventDays() {
  const token = useToken();
  
  const  {
    data: eventDays,
    loading: eventDaysLoading,
    error: eventDaysError,
    act: getEventDays
  } = useAsync(() => activityApi.getEventDays(token));

  return {
    eventDays,
    eventDaysLoading,
    eventDaysError,
    getEventDays
  };
}

