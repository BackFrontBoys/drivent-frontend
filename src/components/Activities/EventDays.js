import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button } from '@mui/material';

export default function EventDays({ id, date, isSelected, setSelected }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#E0E0E0'
      },
      secondary: {
        main: '#FFD37D'
      }
    }
  });
  
  function dateConversion() {
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
    <ThemeProvider theme={theme}>
      <Button 
        variant='contained' 
        color={isSelected ? 'secondary' : 'primary'} 
        style={{ 
          textTransform: 'none', 
          fontWeight: 400, 
          marginRight: 10,
          border: 'none'
        }} 
        onClick={() => setSelected(id)}>{dateConversion()}</Button>
    </ThemeProvider>
  );
}
