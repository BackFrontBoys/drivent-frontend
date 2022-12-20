import { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

import useHotelRooms from '../../hooks/api/useRooms';
import RoomContainer from './RoomContainer';

export default function RoomsForm({ hotelId }) {
  const { hotelRooms } = useHotelRooms(hotelId);

  const [selected, setSelected] = useState(0);

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
