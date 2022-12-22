import TicketComponent from '../../../components/Ticket/TicketComponent';
import PaymentComponent from '../../../components/Payment/PaymentComponent';
import useEnrollment from '../../../hooks/api/useEnrollment';
import useTicket from '../../../hooks/api/useTicket';

export default function Payment() {
  const { enrollment } = useEnrollment();
  const { ticket, getTicket } = useTicket();
  
  return (
    <>
      {!ticket ? 
        (
          <TicketComponent enrollment={enrollment} getTicket={getTicket}/>
        ) 
        : 
        (         
          <PaymentComponent enrollment={enrollment} ticket={ticket} getTicket={getTicket} />         
        )}
    </>
  );
};

