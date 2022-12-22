import styled from 'styled-components';

export default styled.div`
  width: 196px;
  height: 264px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: #FFEED2;
  border-radius: 10px;
  padding: 16px 14px; 
  margin-right: 19px;
  margin-bottom: 19px;

  img{
      width: 168px;
      height: 109px;
      border-radius: 5px;
      margin-bottom: 10px;
      object-fit: cover;
  }

  h5{
      width: 100%;

      font-family: 'Roboto', sans-serif;
      font-size: 20px;
      line-height: 23px;
      color: #343434;
      word-wrap: break-word;
  }

  h4 {
      width: 100%;

      font-family: 'Roboto', sans-serif;
      font-weight: bold;
      font-size: 13px;
      line-height: 20px;
      color: #343434;
      word-wrap: break-word;
  }

  h3 {
      width: 100%;

      font-family: 'Roboto', sans-serif;
      font-size: 13px;
      line-height: 20px;
      color: #343434;
      word-wrap: break-word;
  }

`;
