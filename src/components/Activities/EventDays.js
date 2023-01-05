import styled from 'styled-components';
import MuiButton from '@material-ui/core/Button';

export default function EventDays({ date }) {  
  function dateConverse() {
    const newDate = new Date(date);
    const month = newDate.toLocaleDateString().slice(0, -5);
    let weekday = '';

    switch (newDate.getDay()) {
    case 0:
      weekday = 'Domingo';
      break;
    case 1:
      weekday = 'Segunda';
      break;
    case 2:
      weekday = 'Terça';
      break;
    case 3:
      weekday = 'Quarta';
      break;
    case 4:
      weekday = 'Quinta';
      break;
    case 5:
      weekday = 'Sexta';
      break;                        
    default: 
      weekday = 'Sábado';
      break;
    }

    return `${weekday}, ${month}`;
  }

  return (
    <>
      <Button variant='contained' style={{ textTransform: 'none', fontWeight: 400  }}>{dateConverse()}</Button>
    </>
  );
}

const Button = styled(MuiButton)`
  margin-top: 8px !important;
  margin-right: 10px !important;
`;
