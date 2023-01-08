import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import useToken from '../../hooks/useToken';
import { getEventDays } from '../../services/activityApi';
import EventDays from '../Activities/EventDays';
import { getTickets } from '../../services/ticketApi';

export default function EventDaysContainer({ setEventDaysId }) {
  const [data, setData] = useState([]);
  const [ticket, setTicket] = useState();
  const [selected, setSelected] = useState(null);
  const token = useToken();

  async function getEventDaysFunc() {
    try {
      const days = await getEventDays(token);
      const ticketUser = await getTickets(token);

      setTicket(ticketUser);
      setData(days);
    } catch (error) {
      if (error.response.status === 400) {
        return toast('Você ainda não possui um ticket.');
      }
      return toast('Desculpe, houve um erro.');
    }
  }

  function subTitleDisplayNone() {
    if (!selected) {
      return '';
    }
    return 'none';
  }

  useEffect(async() => {
    getEventDaysFunc();
  }, [selected]);

  return (
    <>
      {ticket?.status === 'RESERVED' ? (
        <Ticket>
          <Info variant="h6" color="textSecondary" style={{ fontWeight: 400 }}>
            Você precisa ter confirmado pagamento antes
          </Info>
          <Info variant="h6" color="textSecondary" style={{ fontWeight: 400 }}>
            de fazer a escolha de atividades
          </Info>
        </Ticket>
      ) : ticket?.TicketType.isRemote ? (
        <Ticket>
          <Info variant="h6" color="textSecondary" style={{ fontWeight: 400 }}>
            Sua modalidade de ingresso não necessita escolher
          </Info>
          <Info variant="h6" color="textSecondary" style={{ fontWeight: 400 }}>
            atividade. Você terá acesso a todas as atividades.
          </Info>
        </Ticket>
      ) : (
        <>
          <SubTitle variant="body1" color="textSecondary" style={{ fontSize: 20, display: subTitleDisplayNone() }}>
            Primeiro, filtre pelo dia do evento:
          </SubTitle>

          {data.map((value, index) => (
            <EventDays
              key={index}
              id={value.id}
              date={value.date}
              isSelected={value.id === selected}
              setSelected={setSelected}
              setEventDaysId={setEventDaysId}
            />
          ))}
        </>
      )}
    </>
  );
}

const SubTitle = styled(Typography)`
  margin-bottom: 20px !important;
`;

const Ticket = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70%;
`;

const Info = styled(Typography)``;
