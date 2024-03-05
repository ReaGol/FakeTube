import React from 'react'
import { styled } from 'styled-components';

const Container = styled.div`
width:360px;
margin-bottom: 45px;
cursor: pointer;
`;

const Image = styled.img`
width:100%;
height:202px;
background-color: #999;
`;

const Details = styled.div`
display: flex;
margin-top: 16px;
gap: 12px;
`;

const ChannelImage = styled.img`
width: 36px;
height: 36px;
border-radius: 50%;
background-color:#999;
`;



const Card = () => {
  return (
    <Container>
      <Image src='https://plus.unsplash.com/premium_photo-1683121941851-189883831f77?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
      <Details>
      <ChannelImage/>
      </Details>
    </Container>
  );
}
export default Card