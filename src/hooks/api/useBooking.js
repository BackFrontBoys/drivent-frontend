import useAsync from '../useAsync';
import useToken from '../useToken';

import * as roomApi from '../../services/roomsApi';

export default function useBooking() {
  const token = useToken();

  const {
    data: booking,
    loading: bookingLoading,
    error: bookingError,
    act: getBooking
  } = useAsync(() => roomApi.getBooking(token));

  return {
    booking,
    bookingLoading,
    bookingError,
    getBooking
  };
}
