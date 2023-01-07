import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import EventDaysContainer from '../../../components/Activities/EventDaysContainer';
import EventsPanel from '../../../components/Activities/EventsPanel';
import { useState } from 'react';

export default function Activities() {
  const [eventDaysId, setEventDaysId] = useState(null);

  console.log(eventDaysId);
  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>

      <EventDaysContainer setEventDaysId={setEventDaysId} />
      <EventsPanel setEventDaysId={setEventDaysId} eventDaysId={eventDaysId}/>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 30px !important;
`;
