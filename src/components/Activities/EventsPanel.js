import styled from 'styled-components';
import useToken from '../../hooks/useToken';
import { toast } from 'react-toastify';
import { getEvents } from '../../services/activityApi';
import { useEffect } from 'react';
import { useState } from 'react';

export default function EventsPanel({ setEventDaysId, eventDaysId }) {
  const token = useToken();
  const [eventData, setEventData] = useState();
  console.log(eventDaysId);

  async function getDayEvents() {
    try {
      const events = await getEvents(token, eventDaysId);
      setEventData(events);
    }catch(error) {
      return toast('Desculpe, houve um erro.');
    }
  };

  useEffect(async() => {
    if(!eventDaysId) {
      return '';
    }else {
      getDayEvents();
    }
  }, [eventDaysId]);

  if(!eventData) return '';

  console.log(eventData);

  return(
    <Main>
      {eventData.map((i, index) => 
        (<SubMain>
          <h2 key={index}>{i.name}</h2>
          <EventsContainer>
            {i.Activities.map((item, index) => 
              (<aside>
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.startTime} - {item.endTime}</p>
                </div>
                
                <header key={index}>
                  <h4>{item.maxQuantity} vagas</h4>
                  <h6>Icon here</h6>
                </header>
              </aside>)
            )}
          </EventsContainer>
          
        </SubMain>)
      )}
    </Main>
  );
}

const Main = styled.main`
 width: 100%;
 height: 80%;
 display: flex;
 align-items:flex-start;
 justify-content: flex-start;
 padding-top: 50px;
 overflow-x: scroll;

::-webkit-scrollbar {
  display: none;
}
`;

const SubMain = styled.main`
 height: 100%;
 display: flex;
 flex-direction: column;
 align-items:center;
 justify-content: flex-start;

 h2{
    font-size: 17px;
    font-weight: 400;
    color: #7B7B7B;
    font-family: 'Roboto', sans-serif;
    text-align: center;
 }
`;

const EventsContainer = styled.nav`
    min-width: 265px;
    border: 1px solid #D7D7D7;
    padding-top: 12px;
    margin-top: 9.96px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 11px 14px 10px 11px;
    gap: 9px;
    height: 100%;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 4px;
    }

    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px white; 
      border-radius: 5px;
    }

    ::-webkit-scrollbar-thumb {
      background:#CFCFCF;
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background:#e6e3e3;
    }
 
    aside{
     width: 265px;
     min-height: 79px;
     background-color: #F1F1F1; // AQUI VAI MUDAR A COR DO BOTÃO PRA VERDE QUANDO INSCRITO
     border-radius: 5px;
     padding-top: 10px;
     padding-left: 12px;
     padding-right:14px;
     display: flex;
     align-items: flex-start;
     justify-content: space-between;
     flex-wrap: wrap;
     word-break: break-all;

     header{
        flex-wrap: wrap;
        word-break: break-all;
        border-left: 1px solid #CFCFCF;
        width: 66px;
        height: 90%;
        padding-left: 15px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

       h4{
         color: #343434;
         font-family: 'Roboto', sans-serif;
         font-weight: 700;
         font-size: 12px;
        }

        h6{
         color: #343434;
         font-family: 'Roboto', sans-serif;
         font-weight: 400;
         font-size: 12px; 
        }
     }

     div{
        display: flex;
        flex-direction: column;
        padding-top: 2px;
        gap: 5px;

        h3{
         color: #343434;
         font-family: 'Roboto', sans-serif;
         font-weight: 700;
         font-size: 12px;
        }
        p{
         color: #343434;
         font-family: 'Roboto', sans-serif;
         font-weight: 400;
         font-size: 12px; 
        }

     }

    }
`;

