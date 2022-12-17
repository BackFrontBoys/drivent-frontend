import { useEffect } from 'react';
import useTicket from '../../../hooks/api/useTicket';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';

export default function Payment() {
  const { ticket } = useTicket();
  const [data, setData] = useState(null);

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
    </>
    
  );
};

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
`;

const TicketInfo = styled(Typography)`
`;
