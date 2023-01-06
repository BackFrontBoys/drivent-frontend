import api from './api';

export async function signIn(email, password) {
  const response = await api.post('/auth/sign-in', { email, password });
  return response.data;
}

export async function gitSignIn(code) {
  console.log(code);
  const response = await api.post(`/auth/sign-in/github?code=${code}`);
  
  return response.data;
}
//
