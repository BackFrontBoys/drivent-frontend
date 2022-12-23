import { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

import useBookRoom from '../../hooks/api/useBookRoom';
import RoomContainer from './RoomContainer';
import StyledButton from '../StyledButton';
import { toast } from 'react-toastify';
import useBooking from '../../hooks/api/useBooking';
import useToken from '../../hooks/useToken';
import { getRooms } from '../../services/roomsApi';
import { updateBooking } from '../../services/roomsApi';

export default function RoomsForm({ hotelId, setNeedBooking, needUpdate, setNeedUpdate }) {
  const [hotelRooms, setHotelRooms] = useState([]);
  const [hotelRoomsLoading, setHotelRoomsLoading] = useState(true);
  const { bookRoomLoading, bookRoom } = useBookRoom();
  const [isDisabled, setIsDisabled] = useState(Boolean(bookRoomLoading));
  const { booking } = useBooking();
  const token = useToken();

  useEffect(() => {
    listRooms();
    setHotelRoomsLoading(false);
  }, [hotelId]);

  async function listRooms() {
    const response = await getRooms(hotelId, token);
    setHotelRooms(response.Rooms);
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
      if (!needUpdate) {
        await bookRoom(data);
        setNeedBooking(false);
      } else if (needUpdate) {
        await updateBooking(token, booking.id, data);
        setNeedBooking(false);
        setNeedUpdate(false);
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
          hotelRooms.map((room) => (
            <RoomContainer
              id={room.id}
              key={room.id}
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
