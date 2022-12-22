import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import useToken from '../../../hooks/useToken';
import useEnrollment from '../../../hooks/api/useEnrollment';
import { getTicketTypes, postTicket } from '../../../services/ticketApi';

export default function Payment() {
  const [ticketPrice, setTicketPrice] = useState(0);
  const [ticketTypeId, setTicketTypeId] = useState({});
  const [showTotal, setShowTotal] = useState(false);
  const [showHosting, setShowHosting] = useState(false);
  const [online, setOnline] = useState('white');
  const [presencial, setPresencial] = useState('white');
  const [noHotel, setNoHotel] = useState('white');
  const [withHotel, setWithHotel] = useState('white');
  const [data, setData] = useState();
  const { enrollment } = useEnrollment();
  const token = useToken();

  async function ticket() {
    try {
      const ticketType = await getTicketTypes(token);

      setData(ticketType);
    } catch (error) {
      toast('Desculpe, houve um erro!');
    }
  }

  useEffect(() => {
    ticket();
  }, []);

  async function postTicketType() {
    try {
      const insertTicket = await postTicket(ticketTypeId, token);

      if (insertTicket) {
        toast('Ingresso reservado com sucesso!');
      }
    } catch (error) {
      toast('Não foi possível reservar seu ingresso!');
    }
  }

  function handleColor(prop) {
    switch (prop) {
    case 'online':
      setOnline('online');
      break;

    case 'presencial':
      setPresencial('presencial');
      break;
    case 'noHotel':
      setNoHotel('noHotel');
      break;
    case 'withHotel':
      setWithHotel('withHotel');
      break;
    default:
      setOnline('white');
    }
  }

  if (data === undefined) {
    return <h1>Loading...</h1>;
  }

  return (
    <Main>
      <div className="title"> Ingresso e pagamento </div>

      {!enrollment ? (
        <Empty>
          <div className="noEnrollment">
            <h1>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</h1>
          </div>
        </Empty>
      ) : (
        <Modality>
          <>
            <h2>Primeiro, escolha sua modalidade de ingresso</h2>

            <nav>
              {data.map((i, index) =>
                !i.isRemote && !i.includesHotel ? (
                  <div
                    className={online}
                    onClick={() => {
                      setShowTotal(false);
                      setTicketPrice(i.price);
                      setShowHosting(true);
                      setTicketTypeId({ ticketTypeId: i.id });
                      setPresencial('white');
                      handleColor('online');
                    }}
                  >
                    <h3>{i.name}</h3> <p>R$ {i.price}</p>
                  </div>
                ) : i.isRemote ? (
                  <div
                    className={presencial}
                    onClick={() => {
                      setTicketPrice(i.price);
                      setShowTotal(true);
                      setShowHosting(false);
                      setTicketTypeId({ ticketTypeId: i.id });
                      setOnline('white');
                      handleColor('presencial');
                    }}
                  >
                    <h3>{i.name}</h3> <p>R$ {i.price}</p>
                  </div>
                ) : (
                  ''
                )
              )}
            </nav>
          </>
        </Modality>
      )}

      {showHosting ? (
        <Modality>
          <h2>Ótimo! Agora escolha sua modalidade de hospedagem</h2>
          <nav>
            {data.map((i, index) =>
              !i.isRemote && !i.includesHotel ? (
                <div className={noHotel}
                  onClick={() => {
                    setShowTotal(true);
                    setTicketTypeId({ ticketTypeId: i.id });
                    setWithHotel('white');
                    handleColor('noHotel');
                  }}
                >
                  <h3>Sem Hotel</h3> <p>+ R$ 0</p>
                </div>
              ) : (
                ''
              )
            )}

            {data.map((i, index) =>
              !i.isRemote && i.includesHotel ? (
                <div className={withHotel}
                  onClick={() => {
                    setTicketPrice(ticketPrice + i.price);
                    setShowTotal(true);
                    setTicketTypeId({ ticketTypeId: i.id });
                    setNoHotel('white');
                    handleColor('withHotel');
                  }}
                >
                  <h3>Com Hotel</h3> <p>+ R$ {i.price}</p>
                </div>
              ) : (
                ''
              )
            )}
          </nav>
        </Modality>
      ) : (
        ''
      )}

      {showTotal ? (
        <BookTicket>
          <h5>
            Fechado! O total ficou em <b style={{ fontWeight: 'bold' }}>R$ {ticketPrice}</b>. Agora é só confirmar:
          </h5>
          <button onClick={() => postTicketType()}>RESERVAR INGRESSO</button>
        </BookTicket>
      ) : (
        ''
      )}
    </Main>
  );
}

const Main = styled.main`
  height: 90%;
  .title {
    color: #000000;
    font-size: 34px;
    font-weight: 400;
    font-family: 'Roboto', sans-serif;
    line-height: 39.84px;
  }
`;
const Empty = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90%;

  .noEnrollment {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 45%;

    h1 {
      color: #8e8e8e;
      font-size: 20px;
      font-weight: 400;
      font-family: 'Roboto', sans-serif;
      line-height: 23.44px;
    }
  }
`;

const Modality = styled.aside`
  padding-top: 37px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;

  h2 {
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    font-weight: 400;
    color: #8e8e8e;
    padding-bottom: 7px;
  }

  nav {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 24px;

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      flex-wrap: wrap;
      width: 145px;
      height: 145px;
      border-radius: 20px;
      box-shadow: inset 0px 0px 0px 1px #cecece;

      h3 {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 16px;
        color: #454545;
      }

      p {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 14px;
        color: #898989;
        padding-top: 5px;
      }
    }

    .white {
      background-color: #ffffff;
    }
    .online {
      background-color: #FFEED2;      
    }

    .presencial {
      background-color: #FFEED2;
    }

    .noHotel {
      background-color: #FFEED2;
    }

    .withHotel{
      background-color: #FFEED2;
    }

    div:hover {
      cursor: pointer;
    }
  }
`;

const BookTicket = styled.div`
  padding-top: 43px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 17px;

  h5 {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 20px;
    color: #8e8e8e;
    line-height: 23.44px;
  }

  button {
    max-width: 162px;
    width: 100%;
    height: 37px;
    background-color: #e0e0e0;
    border-radius: 4px;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);
    border: 1px inset transparent;

    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    text-align: center;
    color: #000000;
    cursor: pointer;
  }
`;
