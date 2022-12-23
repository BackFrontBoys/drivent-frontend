import { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

import useHotelRooms from '../../hooks/api/useRooms';
import useBookRoom from '../../hooks/api/useBookRoom';
import RoomContainer from './RoomContainer';
import StyledButton from '../StyledButton';
import { toast } from 'react-toastify';
import useBooking from '../../hooks/api/useBooking';
import useUpdateBooking from '../../hooks/api/useUpdateBooking';
import useToken from '../../hooks/useToken';
import { getRooms } from '../../services/roomsApi';

export default function RoomsForm({ update, hotelId, setNeedBooking }) {
  //const { hotelRooms, hotelRoomsLoading } = useHotelRooms(hotelId);
  const [hotelRooms, setHotelRooms] = useState([]);
  const [hotelRoomsLoading, setHotelRoomsLoading] = useState(true);
  const { bookRoomLoading, bookRoom } = useBookRoom();
  const { booking } = useBooking();
  const token = useToken();

  useEffect(() => {
    listRooms();
    setHotelRoomsLoading(false);
  }, [hotelId]);

  console.log(hotelRooms);

  async function listRooms() {
    const response = await getRooms(hotelId, token);
    setHotelRooms(response.Rooms);
  } 

  let isDisabled = Boolean(bookRoomLoading);

  if (booking) {
    const { updateBookingLoading } = useUpdateBooking(booking.id);
    isDisabled = updateBookingLoading;
  }

  const [selected, setSelected] = useState(0);

  async function handleBookRoom(id) {
    if (selected <= 0) {
      return;
    }

    const data = {
      roomId: id,
    };

    try {
      if (!booking) {
        await bookRoom(data);
        setNeedBooking(false);
      } else if (booking) {
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
        {hotelRoomsLoading ? (
          <></>
        ) : (
          hotelRooms.Rooms.map((room) => (
            <RoomContainer
              id={room.id}
              name={room.name}
              capacity={room.capacity}
              booking={room.Booking}
              isSelected={room.id === selected}
              setSelected={setSelected}
            />
          ))
        )}
      </RoomsContainer>

      <StyledButton
        onClick={() => {
          handleBookRoom(selected);
        }}
        disabled={isDisabled}
      >
        RESERVAR QUARTO
      </StyledButton>
    </>
  );
}

const RoomsHeader = styled(Typography)`
  margin-bottom: 20px !important;
  color: #8e8e8e;
`;

const RoomsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
