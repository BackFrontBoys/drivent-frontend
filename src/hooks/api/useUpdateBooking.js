import useAsync from '../useAsync';
import useToken from '../useToken';

import * as roomApi from '../../services/roomsApi';

export default function useUpdateBooking(bookingId) {
  const token = useToken();

  const {
    loading: updateBookingLoading,
    error: updateBookingError,
    act: updateBooking
  } = useAsync((data) => roomApi.updateBooking(token, bookingId, data), false);

  return {
    updateBookingLoading,
    updateBookingError,
    updateBooking
  };
}
