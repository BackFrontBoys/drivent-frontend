import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import EventDaysContainer from '../../../components/Activities/EventDaysContainer';

export default function Activities() {
  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>

      <EventDaysContainer />         
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 30px!important;
`;
