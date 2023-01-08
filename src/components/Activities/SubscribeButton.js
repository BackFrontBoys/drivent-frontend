import styled from 'styled-components';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

import { green, red } from '@mui/material/colors';

export default function SubscribeButton({ isSubscribed, availableSpots }) {
  return (
    <>
      <Container>
        {
          availableSpots ?
            (
              isSubscribed ?
                (
                  <>
                    <LoginOutlinedIcon sx={{ fontSize: 30, color: green[600] }} />
                    <Spots color={availableSpots}>{availableSpots} vagas</Spots>
                  </>
                )
                :
                (
                  <>
                    <CheckCircleOutlinedIcon sx={{ fontSize: 30, color: green[600] }} />
                    <Spots color={availableSpots}>Inscrito</Spots>
                  </>
                )
            )
            :
            <>
              <HighlightOffRoundedIcon sx={{ fontSize: 30, color: red[600] }} />
              <Spots color={availableSpots}>Esgotado</Spots>
            </>
        }
      </Container>
    </>);
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Spots = styled.p`  
  font-size: 9px;
  color: ${props => (props.color ? '#43a047' : '#e93535')};

  font-family: 'Roboto', sans-serif;
`;
