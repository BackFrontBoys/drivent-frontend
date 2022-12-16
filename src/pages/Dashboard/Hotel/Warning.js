import styled from 'styled-components';

export function Warning({ includeHotel }) {
  return(
    <Container>
      {includeHotel?
        <h4>
            Você precisa ter confirmado pagamento antes
    de fazer a escolha de hospedagem
        </h4>
        :
        <h4>
          Sua modalidade de ingresso não inclui hospedagem
Prossiga para a escolha de atividades
        </h4>
      }

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
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;

    color: #8E8E8E;
  }
`;
