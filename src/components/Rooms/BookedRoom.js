import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import StyledCard from '../StyledCard';
import StyledButton from '../StyledButton';

export default function BookedRoom({ booking, setNeedBooking }) {
  let roomType = 'Single';

  if (Number(booking.Room.capacity) === 2) {
    roomType = 'Double';
  }

  if (Number(booking.Room.capacity) === 3) {
    roomType = 'Triple';
  }

  const roomMates = booking.Room.Booking.length - 1;

  return (
    <>
      <Header variant="h4">Escolha de hotel e quarto</Header>

      <InfoHeader variant="h6">Você já escolheu seu quarto:</InfoHeader>

      <StyledCard>
        <img src={booking.Hotel.image} alt='hotel' />
        <h5>{booking.Hotel.name}</h5>
        <h4>Quarto reservado</h4>
        <h3>{booking.Room.name} ({roomType})</h3>
        <h4>Pessoas no seu quarto</h4>
        <h3>Você {roomType === 'Single' ? '' : `você e mais ${roomMates}`}</h3>
      </StyledCard>

      <StyledButton onClick={() => { setNeedBooking(true); }}>TROCAR DE QUARTO</StyledButton>
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
