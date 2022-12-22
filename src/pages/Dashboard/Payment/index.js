import PaymentComponent from '../../../components/Payment/PaymentComponent';
import useTicket from '../../../hooks/api/useTicket';

export default function Payment() {
  const { ticket, getTicket } = useTicket();

  return (
    <>
      {!ticket ? 
        (
          'código ou componente da sandi aqui'
        ) 
        : 
        (         
          <PaymentComponent ticket={ticket} getTicket={getTicket}/>         
        )}
    </>
  );
};
