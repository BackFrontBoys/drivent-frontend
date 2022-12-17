import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

export default function Payment() {
  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <SubTitle variant="h6" color="textSecondary">Ingresso escolhido</SubTitle>

      <TicketWrapper>
        <TicketInfo variant="subtitle1">Presencial + Com Hotel</TicketInfo>
        <TicketInfo variant="subtitle1" color="textSecondary">R$ 600</TicketInfo>
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
