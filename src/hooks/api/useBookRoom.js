import useAsync from '../useAsync';
import useToken from '../useToken';

import * as roomApi from '../../services/roomsApi';

export default function useBookRoom() {
  const token = useToken();

  const {
    loading: bookRoomLoading,
    error: bookRoomError,
    act: bookRoom,
  } = useAsync((data) => roomApi.bookRoom(data, token), false);

  return {
    bookRoomLoading,
    bookRoomError,
    bookRoom
  };
}
