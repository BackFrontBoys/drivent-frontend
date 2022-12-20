import { useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';
import { getTickets } from '../../../services/ticketApi';
import { SelectHotels } from './SelectHotels';
import { Warning } from './Warning';

export default function Hotel() {
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState('');
  const token = useToken();
  async function hotel() {
    try {
      const ticket = await getTickets(token);

      if(ticket.status !== 'PAID') {
        setMessage('Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem');
        return setIsValid(false);
      }else if(ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
        setMessage('Sua modalidade de ingresso não inclui hospedagem. Prossiga para a escolha de atividades');
        return;
      }else{
        return setIsValid(true);
      };
    } catch (error) {
      setMessage('Erro em obter informações de pagamento');
      setIsValid(false);
    }
  }

  useEffect(() => {
    hotel();
  }, []); 

  return (
    <>
      {isValid? 
        <SelectHotels/> 
        : 
        <Warning>{message}</Warning>}
    </>);
}

