import { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

import useHotelRooms from '../../hooks/api/useRooms';
import useBookRoom from '../../hooks/api/useBookRoom';
import RoomContainer from './RoomContainer';
import StyledButton from '../StyledButton';
import { toast } from 'react-toastify';
import useBooking from '../../hooks/api/useBooking';
import useUpdateBooking from '../../hooks/api/useUpdateBooking';

export default function RoomsForm({ hotelId, setNeedBooking }) {
  const { hotelRooms } = useHotelRooms(hotelId);
  const { bookRoomLoading, bookRoom } = useBookRoom();
  const { bookingError, booking } = useBooking();

  let isDisabled = Boolean(bookRoomLoading);

  if (!bookingError) {
    const { updateBookingLoading } = useUpdateBooking(booking.id);
    isDisabled = updateBookingLoading;
  }

  const [selected, setSelected] = useState(0);

  async function handleBookRoom(id) {
    if (selected <= 0) {
      return;
    }

    const data = {
      roomId: id
    };

    try {
      if (bookingError) {
        await bookRoom(data);
        setNeedBooking(false);
      } else if (!bookingError) {
        await useUpdateBooking(booking.id).updateBooking(data);
        setNeedBooking(false);
      }
      toast('Quarto reservado com sucesso');
    } catch (err) {
      toast('Não foi possível reservar o quarto');
    }
  }

  return (
    <>
      <RoomsHeader variant="h6">Ótima pedida! Agora escolha seu quarto:</RoomsHeader>

      <RoomsContainer>

        {
          hotelRooms.Rooms.map(room => (
            <RoomContainer id={room.id} name={room.name}
              capacity={room.capacity} booking={room.Booking}
              isSelected={(room.id === selected)} setSelected={setSelected} />
          ))
        }

      </RoomsContainer>

      <StyledButton onClick={() => { handleBookRoom(selected); }}
        disabled={isDisabled}>RESERVAR QUARTO</StyledButton>

    </>);
}

const RoomsHeader = styled(Typography)`
  margin-bottom: 20px!important;
  color: #8E8E8E;
`;

const RoomsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;