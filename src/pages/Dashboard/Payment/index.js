import { useEffect } from 'react';
import useTicket from '../../../hooks/api/useTicket';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css';
import Button from '../../../components/Form/Button';

export default function Payment() {
  const { ticket } = useTicket();
  const [data, setData] = useState(null);
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [focus, setFocus] = useState('');

  useEffect(() => {
    setData(ticket);
  }, [ticket]);

  function renderTicketInfo() {
    if(data?.TicketType.isRemote === false && data?.TicketType.includesHotel === false) {
      return 'Presencial + Sem Hotel';
    }

    if(data?.TicketType.isRemote === false && data?.TicketType.includesHotel === true) {
      return 'Presencial + Com Hotel';
    }

    return 'Online';
  }

  function handleSubmit(e) {
    e.preventDefault();

    const body = {
      cvc,
      expiry,
      focus,
      name,
      number,
    };

    console.log(body);
  }
  
  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <SubTitle variant="h6" color="textSecondary">Ingresso escolhido</SubTitle>

      <TicketWrapper>
        <TicketInfo variant="subtitle1">{renderTicketInfo()}</TicketInfo>
        <TicketInfo variant="subtitle1" color="textSecondary">
          R$ {data?.TicketType.price
            .toString()
            .slice(0, -2)}
        </TicketInfo>
      </TicketWrapper>

      <SubTitle variant="h6" color="textSecondary">Pagamento</SubTitle>

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
    
  );
};

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
    margin-bottom: 20px;
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

const TicketInfo = styled(Typography)`
`;
