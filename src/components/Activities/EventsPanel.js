import styled from 'styled-components';
import useToken from '../../hooks/useToken';
import { toast } from 'react-toastify';
import { getEvents } from '../../services/activityApi';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import SubscribeButton from './SubscribeButton';
import UserContext from '../../contexts/UserContext';

export default function EventsPanel({ eventDaysId }) {
  const token = useToken();
  const [eventData, setEventData] = useState();
  const { userData } = useContext(UserContext);
  //console.log(eventDaysId);

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

  function isSubscribed(bookingArray) {
    for (let i = 0; i < bookingArray.length; i++) {
      if (bookingArray[i].userId === userData.user.id) {
        return true;
      }
    }

    return false;
  }

  //console.log(eventData);

  return(
    <Main>
      {eventData.map((i, index) => 
        (<SubMain>
          <h2 key={index}>{i.name}</h2>
          <EventsContainer>
            {i.Activities.map((item, index) => 
              (<aside key={index}>
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.startTime} - {item.endTime}</p>
                </div>
                
                <header key={index}>
                  <SubscribeButton
                    isSubscribed={isSubscribed(item.ActivitiesBooking)}
                    availableSpots={item.maxQuantity-item.ActivitiesBooking.length}
                    activityId={item.id} />
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
        width: 70px;
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
        width: 65%;

        h3{
         color: #343434;
         font-family: 'Roboto', sans-serif;
         font-weight: 700;
         font-size: 12px;
         line-break: strict;
         word-break: break-word;
        }
        p{
         color: #343434;
         font-family: 'Roboto', sans-serif;
         font-weight: 400;
         font-size: 12px; 
         word-break: break-word;
        }

     }

    }
`;

