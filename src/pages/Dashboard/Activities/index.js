import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import useToken from '../../../hooks/useToken';
import { getEventDays } from '../../../services/activityApi';
import EventDays from '../../../components/Activities/EventDays';

export default function Activities() {
  const [data, setData] = useState([]);
  const token = useToken();

  async function getEventDaysFunc() {
    try {
      const days = await getEventDays(token);

      setData(days);
    } catch (error) {
      toast('Desculpe, houve um erro!');
    }
  }

  useEffect(async() => {
    getEventDaysFunc();
  }, []);

  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>

      <SubTitle variant="body1" color="textSecondary" style={{ fontSize: 20 }}>Primeiro, filtre pelo dia do evento:</SubTitle>
      
      {data.map((value, index) => (
        <EventDays key={index} date={value.date}/>
      ))}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 30px!important;
`;

const SubTitle = styled(Typography)`
  margin-bottom: 20px!important;
`;
