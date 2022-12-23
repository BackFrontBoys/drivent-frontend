import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import StyledCard from '../StyledCard';
import StyledButton from '../StyledButton';
import useBooking from '../../hooks/api/useBooking';

export default function BookedRoom({ setNeedBooking, setNeedUpdate }) {
  const { booking } = useBooking();
  
  let roomType = 'Single';
  let roomMates = 0;

  if (booking) {
    if (Number(booking.Room.capacity) === 2) {
      roomType = 'Double';
    }
  
    if (Number(booking.Room.capacity) === 3) {
      roomType = 'Triple';
    }
  
    roomMates = booking.Room.Booking.length - 1;
  }

  return (!booking ? <></> :
    <>
      <Header variant="h4">Escolha de hotel e quarto</Header>

      <InfoHeader variant="h6">Você já escolheu seu quarto:</InfoHeader>

      <StyledCard>
        <img src={booking.Room.Hotel.image} alt='hotel' />
        <h5>{booking.Room.Hotel.name}</h5>
        <h4>Quarto reservado</h4>
        <h3>{booking.Room.name} ({roomType})</h3>
        <h4>Pessoas no seu quarto</h4>
        <h3>{(roomType === 'Single' || roomMates===0) ? 'Você' : `Você e mais ${roomMates}`}</h3>
      </StyledCard>

      <StyledButton onClick={() => { setNeedBooking(true); setNeedUpdate(true); }}>TROCAR DE QUARTO</StyledButton>
    </>
  );
}

const Header = styled(Typography)`
  margin-bottom: 20px!important;
`;

const InfoHeader = styled(Typography)`
  margin-bottom: 20px!important;

  color: #8e8e8e;
`;
