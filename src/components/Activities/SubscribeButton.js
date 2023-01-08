import styled from 'styled-components';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { toast } from 'react-toastify';
import { green, red } from '@mui/material/colors';
import useToken from '../../hooks/useToken';
import { postActivityBooking } from '../../services/activityApi';
import { useState } from 'react';

export default function SubscribeButton({ isSubscribed, availableSpots, activityId }) {
  const token = useToken();
  const [subscribe, setSubscribe] = useState(isSubscribed);
  const [isDisabled, setIsDisabled] = useState(false); 

  async function subscribeActivity() {
    if(isDisabled) {
      return;
    }
    setIsDisabled(true);
    try {
      await postActivityBooking(token, activityId);
      setSubscribe(true);
      toast('Inscrição realizada com sucesso');
      setIsDisabled(false);
    } catch (err) {
      toast('Não foi possível se inscrever');
      setIsDisabled(false);
    }
  }
  return (
    <>
      <Container>
        {
          availableSpots ?
            (
              !subscribe ?
                (
                  <span onClick={() => {subscribeActivity();}} disabled={isDisabled}>
                    <LoginOutlinedIcon sx={{ fontSize: 30, color: green[600] }} />
                    <Spots color={availableSpots}>{availableSpots} vagas</Spots>
                  </span>
                )
                :
                (
                  <>
                    <CheckCircleOutlinedIcon sx={{ fontSize: 30, color: green[600] }}/>
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
  span{
    z-index: 5px;
  }
`;

const Spots = styled.p`  
  font-size: 9px;
  color: ${props => (props.color ? '#43a047' : '#e93535')};

  font-family: 'Roboto', sans-serif;
`;
