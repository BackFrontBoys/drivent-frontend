import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css';
import Button from '../../components/Form/Button';
import useSavePayment from '../../hooks/api/useSavePayment';
import { toast } from 'react-toastify';
import { IconContext } from 'react-icons';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import useTicketType from '../../hooks/api/useTicketType';

export default function PaymentComponent({ enrollment, ticket, getTicket }) {
  const { savePayment } = useSavePayment();
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [focus, setFocus] = useState('');
  const { ticketTypes } = useTicketType();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(async() => {
    try {
      const priceTicket = await ticketTypes
        .filter(value => value.isRemote === false && value.includesHotel === false)
        .map(value => value.price);     

      setTotalPrice(priceTicket[0]);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error.message);
    }   
  }, [ticketTypes]);

  function renderTicketInfo() {    
    if (ticket?.TicketType.isRemote === false && ticket?.TicketType.includesHotel === false) {
      return 'Presencial + Sem Hotel';
    }

    if (ticket?.TicketType.isRemote === false && ticket?.TicketType.includesHotel === true) {   
      return 'Presencial + Com Hotel';
    }

    return 'Online';
  }

  function ticketPrice() {
    if (ticket?.TicketType.isRemote === false && ticket?.TicketType.includesHotel === false) {
      return ticket?.TicketType.price;
    }

    if (ticket?.TicketType.isRemote === false && ticket?.TicketType.includesHotel === true) {      
      return ticket?.TicketType.price + totalPrice;    
    }

    return ticket?.TicketType.price;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const cardData = {
      cvc,
      expiry,
      issuer: name,
      number,
    };

    try {
      if (cvc.length !== 3 ||
        (expiry.length < 4 || expiry.length > 5) ||
        name.length < 6 ||
        number.length !== 16) {
        return toast('Dados do cartão incorreto!');
      }
      await savePayment(ticket?.id, cardData);
      getTicket();
      resetForm();
      toast('Pagamento feito com sucesso!');
    } catch (err) {
      toast('Não foi possível efetuar o pagamento!');
    }
  }

  function resetForm() {
    setCvc('');
    setExpiry('');
    setName('');
    setNumber('');
  }

  return (
    <>      
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>

      {!enrollment ? 
        (
          <Enroll>
            <Info variant="h6" color="textSecondary">Você precisa completar sua inscrição antes</Info>
            <Info variant="h6" color="textSecondary">de prosseguir pra escolha de ingresso</Info>
          </Enroll>
          
        ) 
        : 
        (
          <>
            <SubTitle variant="h6" color="textSecondary">Ingresso escolhido</SubTitle>

            <TicketWrapper>
              <Info variant="subtitle1">{renderTicketInfo()}</Info>
              <Info variant="subtitle1" color="textSecondary">
                R$ {ticketPrice()
                  .toString()
                  .slice(0, -2)}
              </Info>
            </TicketWrapper>

            <SubTitle variant="h6" color="textSecondary">Pagamento</SubTitle>

            {ticket?.status === 'RESERVED' ?
              (
                <>
                  <PaymentCard>
                    <div>
                      <Cards
                        cvc={cvc}
                        expiry={expiry}
                        focused={focus}
                        name={name}
                        number={number}
                      />
                    </div>

                    <PaymentForm>
                      <input
                        type="tel"
                        name="card-number"
                        placeholder="Card Number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        onFocus={(e) => setFocus(e.target.name)}
                      />

                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={(e) => setFocus(e.target.name)}
                      />

                      <div>
                        <input
                          className="expiry"
                          type="text"
                          name="expiry"
                          placeholder="Valid Thru"
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          onFocus={(e) => setFocus(e.target.name)}
                        />

                        <input
                          className="cvc"
                          type="tel"
                          name="cvc"
                          placeholder="CVC"
                          value={cvc}
                          onChange={(e) => setCvc(e.target.value)}
                          onFocus={(e) => setFocus(e.target.name)}
                        />
                      </div>
                    </PaymentForm>
                  </PaymentCard>

                  <Button onClick={handleSubmit}>FINALIZAR PAGAMENTO</Button>
                </>
              )
              :
              (
                <Paid>
                  <IconContext.Provider
                    value={{
                      color: '#36B853',
                      className: 'global-class-name',
                      size: '50px',
                    }}>
                    <IoCheckmarkCircleSharp className='ion-icon' />
                  </IconContext.Provider>

                  <div>
                    <Info variant='body1' style={{ fontWeight: 700 }} >Pagamento Confirmado!</Info>
                    <Info variant='body1'>Prossiga para escolha de hospedagem e atividades</Info>
                  </div>
                </Paid>
              )}      
          </>
        )}      
    </>
  );
};

const Enroll = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70%;
`;

const StyledTypography = styled(Typography)`
  margin-bottom: 30px!important;
`;

const SubTitle = styled(Typography)`
  margin-bottom: 20px!important;
`;

const TicketWrapper = styled.div`
  width: 290px;
  height: 108px;
  border-radius: 20px;
  background-color: #FFEED2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Paid = styled.div`
  margin-top: -10px;
  display: flex;
  align-items: center;

  .ion-icon {
    margin-right: 10px;
  }
`;

const Info = styled(Typography)`
`;

const PaymentCard = styled.div`
  display: flex;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
    width: 100px;
    
    div {
      margin-bottom: 10px;
    }
  }
`;

const PaymentForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  width: 100%;

  @media (max-width: 600px) {
    width: 500px;
    margin-left: 0px;
  }

  input {
    margin-bottom: 23px;
    width: 50%;
    height: 45px;
    border-radius: 5px;
    border-width: 1px;
    border-color: #8E8E8E;
    font-size: 1.1rem;
  }

  input::placeholder {
      color: #8E8E8E;
      padding-left: 10px;
    }

  .expiry {
    width: 30%;
  }

  .cvc {
    width: 15%;
    margin-left: 30px;
  }
`;
