import api from './api';

export async function getRooms(hotelId, token) {
  const response = await api.get(`/hotels/${hotelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  return response.data;
}

export async function bookRoom(body, token) {
  const response = await api.post('/booking', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getBooking(token) {
  const response = await api.post('/booking', {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  return response.data;
}
