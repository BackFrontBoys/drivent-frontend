import api from './api';

export async function getEventDays(token) {
  const response = await api.get('/activities', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getEvents(token, eventDayId) {
  const response = await api.get(`/activities/events?eventDayId=${eventDayId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
