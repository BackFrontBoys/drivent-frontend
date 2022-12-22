import { useEffect, useState } from 'react';
import styled from 'styled-components';

export function CardHotels({ image, name, id, Rooms, selectHotel }) {
  const [text, setText] = useState('');
  const [free, setfree] = useState(0);

  function defineText(Rooms) {
    let options = {
      single: false,
      double: false,
      triple: false
    };

    let booking = 0;
    let aux = 0;

    for(let i = 0; i < Rooms.length; i++) {
      booking += Number(Rooms[i].Booking.length);
      aux += Number(Rooms[i].capacity);
      if(Rooms[i].capacity === 1 && options.single === false) {
        options.single = true;
      }
      if(Rooms[i].capacity === 2 && options.double === false) {
        options.double = true;
      }
      if(Rooms[i].capacity === 3 && options.triple === false) {
        options.triple = true;
      }
    }
    setfree(aux - booking);
    if(options.single === true) {
      setText('Single');
    }
    if(options.double === true) {
      setText('Double');
    }
    if(options.triple === true) {
      setText('Triple');
    }
    if(options.single === true && options.double === true) {
      setText('Single e Double');
    }
    if(options.single === true && options.triple === true) {
      setText('Single e Triple');
    }
    if(options.double === true && options.triple === true) {
      setText('Double e Triple');
    }
    if(options.single === true && options.double === true && options.triple === true) {
      setText('Single, Double e Triple');
    }
  }

  useEffect(() => {
    defineText(Rooms);
  }, []);

  return(
    <Container onClick={() => {selectHotel(id);}}>
      <img src={image} alt='hotel'/>
      <h5>{name}</h5>
      <Information>
        <h6>Tipos de acomodação:</h6>
        <p>{text}</p>
        <h6>Vagas disponíveis:</h6>
        <p>{free}</p>
      </Information>
    </Container>
  );
}

const Container = styled.div`
    width: 196px;
    height: 264px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background: #EBEBEB;
    border-radius: 10px;
    padding: 16px 14px; 
    margin-right: 19px;
    margin-bottom: 19px;
    cursor: pointer;

    img{
        width: 168px;
        height: 109px;
        border-radius: 5px;
        margin-bottom: 10px;
        object-fit: cover;
    }

    h5{
        width: 100%;

        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        color: #343434;
        word-wrap: break-word;
    }

`;

const Information = styled.div`
    width: 196px;
    height: 264px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0px 14px;
    margin-top: 10px ;

    h6{
        width: 100%;
        font-family: 'Roboto', sans-serif;
        font-weight: 700;
        font-size: 12px;
        line-height: 14px;
        color: #3C3C3C;
        word-wrap: break-word;
    }

    p{
        width: 100%;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        color: #3C3C3C;
        word-wrap: break-word;
    }
    p:nth-child(2){
      margin-bottom: 14px;
    }
`;
