import { useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';
import { getTickets } from '../../../services/ticketApi';
import { Warning } from './Warning';

export default function Hotel() {
  const [isValid, setIsValid] = useState(false);
  const [includeHotel, setIncludeHotel] = useState(true);
  const token = useToken();
  async function hotel() {
    try {
      const ticket = await getTickets(token);

      if(ticket.status !== 'PAID') {
        return setIsValid(false);
      }else if(ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
        return setIncludeHotel(false);
      }else{
        return setIsValid(true);
      };
    } catch (error) {
      setIsValid(false);
    }
  }

  useEffect(() => {
    hotel();
  }, []); 

  return (
    <>
      {isValid? 
        <></> 
        : 
        <Warning
          includeHotel = {includeHotel}
        />}
    </>);
}

