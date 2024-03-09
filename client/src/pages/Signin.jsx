import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLight};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1``;

const SubTitle = styled.h2``;

const Input = styled.input``;

const Button = styled.button``;

const More = styled.div``;

const Signin = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <SubTitle>to continue to FakeTube</SubTitle>
        <Input placeholder='username'></Input>
        <Input type='password' placeholder='password'></Input>
        <Button>Sign In</Button>
        <Title>Or</Title>
        <Input placeholder='username'></Input>
        <Input placeholder='email'></Input>
        <Input type='password' placeholder='password'></Input>
        <Button>Sign Up</Button>
      </Wrapper>
      <More>
      </More>
    </Container>
  );
};

export default Signin;
