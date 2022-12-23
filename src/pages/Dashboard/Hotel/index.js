import { useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';
import { getTickets } from '../../../services/ticketApi';
import { SelectHotels } from './SelectHotels';
import { Warning } from './Warning';
import BookedRoom from '../../../components/Rooms/BookedRoom';
import useBooking from '../../../hooks/api/useBooking';

export default function Hotel() {
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState('');
  const { bookingLoading, bookingError, booking } = useBooking();
  const [needBooking, setNeedBooking] = useState(Boolean(!bookingError));
  const [needUpdate, setNeedUpdate] = useState(Boolean(booking));
  const token = useToken();

  async function hotel() {
    try {
      const ticket = await getTickets(token);

      if (ticket.status !== 'PAID') {
        setMessage('Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem');
        return setIsValid(false);
      } else if (ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
        setMessage('Sua modalidade de ingresso não inclui hospedagem. Prossiga para a escolha de atividades');
        return;
      } else {
        return setIsValid(true);
      }
    } catch (error) {
      setMessage('Erro em obter informações de pagamento');
      setIsValid(false);
    }
  }

  useEffect(() => {
    hotel();
    setNeedBooking(!Boolean(booking));
  }, [booking]);

  return (
    <>
      {isValid ? (
        needBooking ? (
          <SelectHotels setNeedBooking={setNeedBooking} needUpdate={needUpdate} setNeedUpdate={setNeedUpdate} />
        ) : (bookingLoading ? <></> :
          (<BookedRoom setNeedBooking={setNeedBooking} setNeedUpdate={setNeedUpdate} />)
        )
      ) : (
        <Warning>{message}</Warning>
      )}
    </>
  );
}
