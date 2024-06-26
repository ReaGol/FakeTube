import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
// import Cookies from "js-cookie";

const Container = styled.div`
  display: flex;
  flex-direction: column;
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

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const SignIn = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/signin",
        {
          name,
          password,
        },
        { headers: { "Access-Control-Expose-Headers": "Set-Cookie" } }
      );
      dispatch(loginSuccess(res.data));
      navigate("/");
      console.log(res.data);
    } catch (error) {
      dispatch(loginFailure());
    }
  };

  // const signInWithGoogle = async () => {
  //   dispatch(loginStart());
  //   signInWithPopup(auth, provider);
  //   try {
  //     const res = await axios.post("http://localhost:8800/api/auth/google", {
  //       name: result.user.displayName,
  //       email: result.user.email,
  //       img: result.user.photoURL,
  //     });
  //     dispatch(loginSuccess(res.data));
  //     navigate("/");
  //   } catch (error) {
  //     dispatch(loginFailure());
  //   }
  // };
  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post("http://localhost:8800/api/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            console.log(res);
            dispatch(loginSuccess(res.data));
            navigate("/");
          });
      })
      .catch((error) => {
        dispatch(loginFailure(error));
      });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <SubTitle>to continue to FakeTube</SubTitle>
        <Input
          placeholder='username'
          onChange={(e) => setName(e.target.value)}
        ></Input>
        <Input
          type='password'
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
        <Button onClick={handleLogin}>Sign In</Button>
        <Title>Or</Title>
        <Button onClick={signInWithGoogle}>Signin with Google</Button>
        <Title>Or</Title>
        <Input
          placeholder='username'
          onChange={(e) => setName(e.target.value)}
        ></Input>
        <Input
          placeholder='email'
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <Input
          type='password'
          placeholder='password'
          onChange={(e) => setName(e.target.value)}
        ></Input>
        <Button>Sign Up</Button>
      </Wrapper>
      <More>
        English (USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;
