import useAsync from '../useAsync';
import useToken from '../useToken';

import * as roomApi from '../../services/roomsApi';

export default function useHotelRooms(hotelId) {
  const token = useToken();

  const {
    data: hotelRooms,
    loading: hotelRoomsLoading,
    error: hotelRoomsError,
    act: getHotelRooms
  } = useAsync(() => roomApi.getRooms(hotelId, token));

  return {
    hotelRooms,
    hotelRoomsLoading,
    hotelRoomsError,
    getHotelRooms
  };
}
