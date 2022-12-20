import styled from 'styled-components';

export function Warning({ children }) {
  return(
    <Container>
      <h4>{children}</h4>
    </Container>);
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  h4{
    max-width: 410px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;

    color: #8E8E8E;
  }
`;
