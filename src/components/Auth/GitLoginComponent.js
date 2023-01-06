import styled from 'styled-components';

import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import useSetGitCode from '../../hooks/api/useSetGitCode';
import useGitSignin from '../../hooks/api/useGitSignin';

export default function GitLoginComponent() {
  const { setUserData } = useContext(UserContext);
  const { gitSignIn } = useGitSignin();

  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  if (code) {
    window.history.pushState('object or string', 'Title', '/sign-in');
    SignIn();
  }

  async function SignIn() {
    try {
      const data = await gitSignIn(code);
      console.log('asd');

      if (!data) {
        return Error;
      }

      setUserData(data);
      toast('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      toast('Não foi possível fazer o login!');
    }
  }

  return (
    <Container onClick={useSetGitCode}>
      GitHub Sign-in
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 40px;
  width: 100%;

  margin-top: 5px;

  border-radius: 5px;

  background-color: black;
  color: #ffffff;
`;
