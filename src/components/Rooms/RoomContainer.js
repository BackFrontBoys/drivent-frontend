import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PersonIcon from '@mui/icons-material/Person';
import { pink } from '@mui/material/colors';

export default function RoomContainer({ id, name, capacity, booking, isSelected, setSelected }) {
  const roomState = [];

  for (let i = 0; i < capacity; i++) {
    roomState.push(true);

    if (booking[i]) {
      roomState[i] = false;
    }
  }

  const available = Boolean(capacity - booking.length);

  function handleColor() {
    if (available) {
      if (isSelected) {
        return {
          fontColor: 'black',
          backgroundColor: '#FFEED2',
          iconColor: '#FF4791'
        };
      } else {
        return {
          fontColor: 'black',
          backgroundColor: '#FFFFFF',
          iconColor: 'black'
        };
      }
    }

    return {
      fontColor: '#8C8C8C',
      backgroundColor: '#E9E9E9',
      iconColor: '#8C8C8C'
    };
  }

  const [color, setColor] = useState(handleColor());

  useEffect(() => {
    setColor(handleColor());
  }, [isSelected]);

  return (
    <RoomButton fontColor={color.fontColor} backgroundColor={color.backgroundColor} onClick={() => { setSelected(id); }} disabled={!available}>
      {name}
      <CapacityContainer>
        {
          roomState.map((value, key) => (
            value ?
              (
                ((isSelected && roomState[key-1]===false) || (key===0 && roomState[1]===true)) ?
                  (
                    <PersonIcon color={'secondary'} sx={{ fontSize: 25, color: pink[400] }} />
                  ) :
                  (
                    <PersonOutlineOutlinedIcon sx={{ fontSize: 25 }} />
                  )
              ) :
              (
                <PersonIcon sx={{ fontSize: 25 }} />
              )
          ))
        }
      </CapacityContainer>
    </RoomButton>
  );
}

const RoomButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 190px;
  height: 45px;

  margin-right: 15px;
  margin-bottom: 10px;

  padding: 13px;

  border: 1px solid;
  border-color: #CECECE;
  border-radius: 10px;

  color: ${props => (props.fontColor)};
  background-color: ${props => (props.backgroundColor)};
  font-size: 18px;

  font-family: 'Roboto', sans-serif;
`;

const CapacityContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
`;
