import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/videos/random");
        setVideos(res.data);
        console.log(videos);
      } catch (error) {
        setError(error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <Container>
      {videos?.map((video)=>(
        <Card/>
      ))}
    </Container>
  );
};

export default Home;
