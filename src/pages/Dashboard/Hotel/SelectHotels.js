import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useToken from '../../../hooks/useToken';
import { getHotel } from '../../../services/hotelApi';
import { CardHotels } from './CardHotels';
import RoomsForm from '../../../components/Rooms';

export function SelectHotels({ setNeedBooking, needUpdate, setNeedUpdate }) {
  const [list, setList] = useState([]);
  const [selectedHotelId, setSelectedHotelId] = useState(0); //pega o id do hotel selecionado
  const [renderRooms, setRenderRooms] = useState(false); //mudar para true so quando selecionar um hotel com id > 0
  const token = useToken();

  function selectHotel(id) {
    if (id !== 0 && selectedHotelId !== id) {
      setSelectedHotelId(id);
      setRenderRooms(true);
      return;
    }
  }

  async function listHotels() {
    setList(await getHotel(token));
  }

  useEffect(() => {
    listHotels();
  }, [selectedHotelId]);

  return (
    <Container>
      <h1>Escolha de hotel e quarto</h1>
      <h4>Primeiro, escolha seu hotel</h4>
      <ul className="hotelList">
        {list.map((item, index) => (
          <CardHotels
            key={index}
            id={item.id}
            image={item.image}
            name={item.name}
            Rooms={item.Rooms}
            setSelectedHotelId={setSelectedHotelId}
            selectHotel={selectHotel}
          />
        ))}
      </ul>
      {renderRooms ? <RoomsForm hotelId={selectedHotelId} setNeedBooking={setNeedBooking} needUpdate={needUpdate} setNeedUpdate={setNeedUpdate} /> : <></>}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;

  h1 {
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 34px;
    line-height: 40px;
    color: #000000;
  }
  h4 {
    margin-top: 36px;
    margin-bottom: 18px;

    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #8e8e8e;
  }

  .hotelList {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;
