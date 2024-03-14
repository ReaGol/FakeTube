import React from "react";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import Mic from "@mui/icons-material/Mic";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLight};
  height: 56px;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
  height: 100%;
  width: 70%;
  padding: 0px 20px;
  margin: 0 auto;
  /* position: relative; */
`;
const Search = styled.div`
  width: 50%;
  /* position: absolute; */
  /* left: 0;
  right: 0;*/
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px;
  border: 1px solid #ccc;
  /* border-radius: 100vh; */
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
`;

const SearchIconContainer = styled.div`
  display: flex;
  /* position: absolute; */
  cursor: pointer;
  align-items: center;
  justify-content: center;
  height: 35px;
  width: 40px;
  border-bottom-right-radius: 50%;
  border-top-right-radius: 50%;
  border: 1px solid #ccc;
  border-left: none;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bg};
`;

const MicContainer = styled.div`
  margin-left: 20px;
`;

const Form = styled.form`
  display: flex;
  /* justify-content:space-around; */
  /* gap: 4px; */
  flex-grow: 1;
  height: 38px;
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const MicButton = styled.button`
  border-radius: 50%;
  border: 1px solid #ccc;
  width: 37px;
  height: 37px;
  align-items: center;
  padding-top: 4px;
  cursor: pointer;
  /* justify-content: flex-start; */
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.soft};
  &:hover {
    background-color: #ccc;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder='Search' />
        </Search>
        <Form>
          <SearchIconContainer>
            <SearchIcon />
          </SearchIconContainer>
          <MicContainer>
            <MicButton>
              <Mic />
            </MicButton>
          </MicContainer>
        </Form>
        {currentUser ? (
          <User>
            <VideoCallOutlinedIcon style={{width:32,height:32}} />
            <Avatar />
            {currentUser.name}
          </User>
        ) : (
          <Link to='signin' style={{ textDecoration: "none" }}>
            <Button>
              <AccountCircleIcon />
              SIGN IN
            </Button>
          </Link>
        )}
      </Wrapper>
    </Container>
  );
}

export default Navbar;
