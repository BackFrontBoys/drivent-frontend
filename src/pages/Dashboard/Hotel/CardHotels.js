import styled from 'styled-components';

export function CardHotels({ image, name, id, selectHotel }) {
  const notFound = 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';

  return(
    <Container onClick={() => {selectHotel(id);}}>
      <img src={image || notFound} alt='hotel'/>
      <h5>{name || 'teste'}</h5>
    </Container>
  );
}

const Container = styled.div`
    width: 196px;
    height: 264px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background: #EBEBEB;
    border-radius: 10px;
    padding: 16px 14px; 
    margin-right: 19px;
    margin-bottom: 19px;
    cursor: pointer;

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
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        color: #343434;
        word-wrap: break-word;
    }

`;
